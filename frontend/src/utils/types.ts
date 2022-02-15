interface UserStatsInterface {
	solved:  number,
	unsolved: number,
}

export type UserStats = UserStatsInterface | null;
interface UserDataInterface {
	handle: string,
	image: string,
	maxRating: number,
	rating: number,
	rank: string,
};

export type UserData = UserDataInterface | null;

export interface LadderData {
	startRating: number,
	endRating: number,
}

export enum ProblemStatus {
	AC = 'AC',
	NOTAC = 'NOTAC',
	WA = 'WA',
	CE = 'CE',
	RE = 'RE',
	MLE = 'MLE',
	TLE = 'TLE',
	NONE = '-',
}

export interface Problem {
	contestId: string,
	index: string,
	name: string,
	tags: [string],
	rating: number,
	frequency: number,
	status: ProblemStatus,
}

export type ProblemStatusMap = Record<string, ProblemStatus>;
