import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import { LadderData, ProblemStatusMap, UserData, UserStats } from './utils/types';
import httpClient from './utils/http';
import { constants } from './utils/constants';

import UserCard from './components/UserCard';
import Header from './components/Header';
import Ladder from './components/Ladder';

import LadderSelector from './components/LadderSelector';
import { assignNewStatus, fetchUserSubmissionsWithRetry, getProblemID } from './utils/utils';

function App() {

	const [searchParams, setSearchParams] = useSearchParams();

	const [user, setUser] = useState<string>('');
	const [userErr, setUserErr] = useState<string>('');
	const [userData, setUserData] = useState<UserData>(null);
	const [userStats, setUserStats] = useState<UserStats>(null);
	const [ladderData, setLadderData] = useState<LadderData>({ startRating: 1200, endRating: 1300 });
	const [problemStatusMap, setProblemStatusMap] = useState<ProblemStatusMap>({});
	const [fetchIntervalID, setfetchIntervalID] = useState<NodeJS.Timer | null>(null);

	const loadUser = async () => {
		const rating = searchParams.get("rating");
		if (rating)
			setSearchParams({ rating, handle: user });
		else
			setSearchParams({ handle: user });

		try {
			const userDataRes = await httpClient.request({
				method: 'GET',
				url: `${constants.cfAPI}/user.info`,
				params: {
					handles: user,
					lang: 'en',
				},
			});
			const userInfo = userDataRes.result[0];
			setUserData({
				handle: userInfo.handle,
				image: userInfo.avatar,
				maxRating: userInfo.maxRating,
				rating: userInfo.rating,
				rank: userInfo.rank,
			});
			setUserErr('');
		} catch (err: any) {
			setUserErr(`Codeforces error: "${err.response.data.comment}"`);
		}
	}

	const loadUserUsingHandle = async (handle: string) => {
		try {
			const userDataRes = await httpClient.request({
				method: 'GET',
				url: `${constants.cfAPI}/user.info`,
				params: {
					handles: handle,
					lang: 'en',
				},
			});
			const userInfo = userDataRes.result[0];
			setUserData({
				handle: userInfo.handle,
				image: userInfo.avatar,
				maxRating: userInfo.maxRating,
				rating: userInfo.rating,
				rank: userInfo.rank,
			});
			setUserErr('');
		} catch (err: any) {
			setUserErr(`Codeforces error: "${err.response.data.comment}"`);
		}
	}

	const updateProblemStatusMap = async (userData: UserData) => {
		let newMap = {} as ProblemStatusMap;
		const submissions = await fetchUserSubmissionsWithRetry(userData, 3);
		for (const submission of submissions) {
			const problem = { ...submission.problem };
			const id = getProblemID(problem);
			newMap[id] = assignNewStatus(newMap[id], submission.verdict);
		}
		setProblemStatusMap(newMap);
	}

	useEffect(() => {
		const handle = searchParams.get("handle");
		if (handle)
			loadUserUsingHandle(handle);
		
		const rating = Number(searchParams.get("rating"));
		if (!isNaN(rating) && rating%100 == 0 && 800 <= rating && rating <= 3500)
			setLadderData({
				startRating: rating,
				endRating: rating+100,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handle = searchParams.get("handle");
		if (handle)
			setSearchParams({ handle, rating: ladderData.startRating.toString() });
		else
			setSearchParams({ rating: ladderData.startRating.toString() });
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ladderData]);

	useEffect(() => {
		if (!userData) return;
		setProblemStatusMap({});
		if (fetchIntervalID) {
			clearInterval(fetchIntervalID);
		}
		updateProblemStatusMap(userData);
		const newFetchIntervalID = setInterval(() => updateProblemStatusMap(userData), constants.submissionFetchInterval);
		setfetchIntervalID(newFetchIntervalID);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	return (
		<div className='container-fluid'>
			<Header heading='C2 LADDERS' />

			<div className="mb-3 row text-center justify-content-center">
				<div className="col-auto">
					<input type="text" placeholder="Search CF Handle" className="form-control" id="inputPassword"
						value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={(e) => {
							if (e.key === 'Enter')
								loadUser();
						}} />
				</div>
				<div className="col-auto">
					<button className='btn btn-primary' onClick={loadUser}><i className="bi bi-search"></i> Search</button>
				</div>
			</div>
			{userErr && <div className='row justify-content-center m-1 text-danger'>{userErr}</div>}
			<UserCard userData={userData} userStats={userStats}/>
			<LadderSelector startRating={900} endRating={3600} step={100} setLadderData={setLadderData} ladderData={ladderData}/>
			<Ladder ladderData={ladderData} problemStatusMap={problemStatusMap} setUserStats={setUserStats}/>
		</div>
	);
}

export default App;
