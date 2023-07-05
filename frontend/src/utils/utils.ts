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

export const fetchUserSubmissionsWithRetry = async (user: UserData, retries: number, loaderStatus: boolean,
	setloaderStatus: (data: boolean) => void): Promise<any[]> => {
	setloaderStatus(true);
	try {
		const res = await fetchUserSubmissions(user);
		setloaderStatus(false);
		return res;
	} catch (err) {
		if (retries > 0) {
			return await fetchUserSubmissionsWithRetry(user, retries - 1, loaderStatus, setloaderStatus);
		}
		setloaderStatus(false);
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
