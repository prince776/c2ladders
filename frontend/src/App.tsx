import React, { useEffect, useState } from 'react';

import { LadderData, ProblemStatusMap, UserData, UserStats } from './utils/types';
import httpClient from './utils/http';
import { constants } from './utils/constants';

import UserCard from './components/UserCard';
import Header from './components/Header';
import Ladder from './components/Ladder';

import LadderSelector from './components/LadderSelector';
import { assignNewStatus, fetchUserSubmissionsWithRetry, getProblemID } from './utils/utils';

function App() {
	
	let storedUser = localStorage.getItem('userKey') || '';//retrieving the user data from the local storage
	if(storedUser != ''){
		storedUser = JSON.parse(localStorage.getItem('userKey')||'');
	}
	const [user, setUser] = useState<string>(storedUser);//using the stored value of user
	const [userErr, setUserErr] = useState<string>('');
	const [userData, setUserData] = useState<UserData>(null);
	const [userStats, setUserStats] = useState<UserStats>(null);
	const [ladderData, setLadderData] = useState<LadderData>({ startRating: 1200, endRating: 1300 });
	const [problemStatusMap, setProblemStatusMap] = useState<ProblemStatusMap>({});
	const [fetchIntervalID, setfetchIntervalID] = useState<NodeJS.Timer | null>(null);

	
	useEffect(() => {//this useEffect updates the username stored in the local storage as the state of user is changed
	    localStorage.setItem('userKey', JSON.stringify(user));
	}, [user]);
	
	
	const loadUser = async () => {
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

	
	if(storedUser !== ''){//if the user data was stored previously load the user data
		loadUser();
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
