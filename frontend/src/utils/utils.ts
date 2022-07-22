import { cfVerdictToStatusMap, constants, problemStatusPriority } from "./constants"
import httpClient from "./http";
import { Problem, ProblemStatus, UserData } from "./types";

export const cfVerdictToStatus = (verdict: string | undefined): ProblemStatus => {
	if (!verdict) return ProblemStatus.NONE;
	if (cfVerdictToStatusMap[verdict]) {
		return cfVerdictToStatusMap[verdict];
	}
	return ProblemStatus.NOTAC;
}

export const assignNewStatus = (status: ProblemStatus | undefined, verdict: string | undefined): ProblemStatus => {
	const newStatus = cfVerdictToStatus(verdict);
	if (!status || problemStatusPriority[newStatus] > problemStatusPriority[status]) {
		return newStatus;
	}
	return status;
}

export const getProblemID = (problem: Problem): string => {
	return `${problem.contestId}-${problem.index}`;
}

export const getProblemLink = (problem: Problem): string => {
	return `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
}

export const fetchUserSubmissionsWithRetry = async (user: UserData, retries: number): Promise<any[]> => {
	try {
		const res =  await fetchUserSubmissions(user);
		return res;
	} catch (err) {
		if (retries > 0) {
			return await fetchUserSubmissionsWithRetry(user, retries - 1);
		}
		throw err;
	}
}

export const fetchUserSubmissions = async (user: UserData): Promise<any[]> => {
	const response = await httpClient.request({
		method: 'GET',
		url: `${constants.cfAPI}/user.status`,
		params: {
			handle: user?.handle,
			lang: 'en',
		},
	});
	return response.result;
}

export const fetchTeamSubmissions = async (team: UserData[], retries: number): Promise<any[]>=> {
	let ans: number[] = [];
	for (const member of team) {
		ans = ans.concat(await fetchUserSubmissionsWithRetry(member, retries));
	}
	return ans;
}

export const aggregateRatings = (teamRatings: number[]) => {
	const getWinProbability = (ra: number, rb: number) => {
		return 1.0 / (1.0 + Math.pow(10.0, (rb - ra) / 400.0));
	}

	let left = 1;
    let right = 1E4;
    for (let tt = 0; tt < 100; tt++) {
        let r = (left + right) / 2.0;
        let rWinsProbability = 1.0;
        for(let i = 0; i < teamRatings.length; i++)
            rWinsProbability *= getWinProbability(r, isNaN(teamRatings[i]) ? 0 : teamRatings[i]);
        let rating = Math.log10(1 / (rWinsProbability) - 1) * 400 + r;
        if (rating > r)
            left = r;
        else
            right = r;
    }
    return Math.round((left + right) / 2.0);
}

export const getUserRank = (ratings: number): string => {
	if(ratings < 1200)	return "newbie";
	if(ratings < 1400)	return "pupil";
	if(ratings < 1600)	return "specialist";
	if(ratings < 1900)	return "expert";
	if(ratings < 2100)	return "candidate master";
	if(ratings < 2300)	return "master";
	if(ratings < 2400)	return "international master";
	if(ratings < 2600)	return "grandmaster";
	if(ratings < 3000)	return "international grandmaster";
	return "legendary grandmaster";
}
