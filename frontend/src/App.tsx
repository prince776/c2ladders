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

	const [user, setUser] = useState<string>('');
	const [userErr, setUserErr] = useState<string>('');
	const [userData, setUserData] = useState<UserData>(null);
	const [userStats, setUserStats] = useState<UserStats>(null);
	const [ladderData, setLadderData] = useState<LadderData>({ startRating: 1200, endRating: 1300 });
	const [problemStatusMap, setProblemStatusMap] = useState<ProblemStatusMap>({});
	const [fetchIntervalID, setfetchIntervalID] = useState<NodeJS.Timer | null>(null);

	const [selected, setSelected] = useState(1200)

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

			const startR = Math.floor(userInfo.rating / 100) * 100 + 200;


			setLadderData({
				startRating: startR,
				endRating: startR + 100,
			})

			setSelected(startR)

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
		<div className='w-full bg-slate-700'>
			<Header heading='ACD Ladders!' />
			<div className='w-full p-2'>

				<div className='flex mt-4'>
					<LadderSelector startRating={900} endRating={3600} step={100} setLadderData={setLadderData} ladderData={ladderData} selected={selected} setSelected={setSelected} />

					{/* <div className="flex">
					<div className="">
						<input type="text" placeholder="Search CF Handle" className="form-control" id="inputPassword"
							value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={(e) => {
								if (e.key === 'Enter')
									loadUser();
							}} />
					</div>
					<div className="">
						<button className='btn btn-primary' onClick={loadUser}><i className="bi bi-search"></i> Search</button>
					</div>
				</div> */}

					{/* user iamge removed for while */}
					{/* {
						userData &&
						<div className="pr-2">
							<img className='min-h-10 min-w-10 rounded-full' src={userData.image} alt={userData.handle} />
						</div>
					} */}



					<div className="relative mx-auto w-auto">
						<input className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5  font-normal text-gray-100 bg-slate-900 rounded-full transition ease-in-outfocus:text-gray-100 " placeholder="CF Handle"
							value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={(e) => {
								if (e.key === 'Enter')
									loadUser();
							}}
						/>
						{/* <button type="submit" className="absolute right-0 top-0 mt-2.5 mr-4" onClick={loadUser}>
							<svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
								version="1.1" id="Capa_1" x="0px" y="0px"
								viewBox="0 0 56.966 56.966"
								width="512px" height="512px">
								<path
									d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
							</svg>
						</button> */}
					</div>

				</div>
				{userErr && <div className='row justify-content-center m-1 text-danger'>{userErr}</div>}
				<UserCard userData={userData} userStats={userStats} />

				<Ladder ladderData={ladderData} problemStatusMap={problemStatusMap} setUserStats={setUserStats} />

			</div>
		</div>
	);
}

export default App;
