import React, { useEffect, useState } from 'react';

import { Handle, LadderData, ProblemStatusMap, UserData, UserStats } from './utils/types';
import httpClient from './utils/http';
import { constants } from './utils/constants';

import UserCard from './components/UserCard';
import Header from './components/Header';
import Ladder from './components/Ladder';

import LadderSelector from './components/LadderSelector';
import { aggregateRatings, assignNewStatus, fetchTeamSubmissions, fetchUserSubmissionsWithRetry, getProblemID, getUserRank } from './utils/utils';

function App() {

	const [user, setUser] = useState<string>('');
	const [userErr, setUserErr] = useState<string>('');
	const [userData, setUserData] = useState<UserData>(null);
	const [teamData, setTeamData] = useState<UserData[]>([]);
	const [userStats, setUserStats] = useState<UserStats>(null);
	const [ladderData, setLadderData] = useState<LadderData>({ startRating: 1200, endRating: 1300 });
	const [problemStatusMap, setProblemStatusMap] = useState<ProblemStatusMap>({});
	const [fetchIntervalID, setfetchIntervalID] = useState<NodeJS.Timer | null>(null);
	const [handleType, setHandleType] = useState<string>(Handle.INDIVIDUAL);

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

	const loadTeam = async () => {
		const teamMembers = user.split(",");
		const teamRatings: number[] = [];
		const membersData = [];
		const teamInfo = {
			handle: "#team",
			image: "",
			maxRating: Number.MIN_SAFE_INTEGER,
			rating: Number.MIN_SAFE_INTEGER,
			rank: "",
		};
		for(let i = 0; i < teamMembers.length; i++) {
			const member = teamMembers[i];
			try {
				const userDataRes = await httpClient.request({
					method: 'GET',
					url: `${constants.cfAPI}/user.info`,
					params: {
						handles: member,
						lang: 'en',
					},
				});
				const userInfo = userDataRes.result[0];
				teamRatings.push(userInfo.rating);
				teamInfo.maxRating = Math.max(teamInfo.maxRating, userInfo.maxRating);
				teamInfo.image = userInfo.avatar;
				membersData.push({
					handle: userInfo.handle,
					image: userInfo.avatar,
					maxRating: userInfo.maxRating,
					rating: userInfo.rating,
					rank: userInfo.rank,
				});
				setUserErr('');
			} catch (err: any) {
				setUserErr(`Codeforces error: "${err.response.data.comment}"`);
				break;
			}
		}
		teamInfo.rating = aggregateRatings(teamRatings);
		teamInfo.maxRating = Math.max(teamInfo.maxRating, teamInfo.rating);
		teamInfo.rank = getUserRank(teamInfo.rating);
		if(!userErr) {
			setUserData(teamInfo);
			setTeamData(membersData);
		}
	}

	const updateProblemStatusMap = async (userData: UserData) => {
		let newMap = {} as ProblemStatusMap;
		let submissions = [];
		if(handleType == Handle.INDIVIDUAL) {
			submissions = await fetchUserSubmissionsWithRetry(userData, 3);
		} else {
			submissions = await fetchTeamSubmissions(teamData, 3);
		}
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
	}, [userData, teamData]);

	return (
		<div className='container-fluid'>
			<Header heading='C2 LADDERS' />

			<div className="mb-3 row text-center justify-content-center">
				<div className="col-auto">
					<select className="form-select" defaultValue={handleType} onChange={(event)=>setHandleType(event.target.value)}>
						<option value={Handle.INDIVIDUAL}>Individual</option>
						<option value={Handle.TEAM}>Team</option>
					</select>
				</div>
				<div className="col-auto">
					<input type="text" placeholder="Search CF Handle" className="form-control" id="inputPassword"
						value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={(e) => {
							if (e.key === 'Enter')
								handleType==Handle.TEAM ? loadTeam() : loadUser();
						}} />
				</div>
				<div className="col-auto">
					<button className='btn btn-primary' onClick={handleType==Handle.TEAM ? loadTeam : loadUser}><i className="bi bi-search"></i> Search</button>
				</div>
			</div>
			{handleType==Handle.TEAM && <div className="mb-3 row text-center justify-content-center">
				<p>**enter comma separated user handles of your team members</p>
			</div>}
			{userErr && <div className='row justify-content-center m-1 text-danger'>{userErr}</div>}
			<UserCard userData={userData} userStats={userStats}/>
			<LadderSelector startRating={900} endRating={3600} step={100} setLadderData={setLadderData} ladderData={ladderData}/>
			<Ladder ladderData={ladderData} problemStatusMap={problemStatusMap} setUserStats={setUserStats}/>
		</div>
	);
}

export default App;
