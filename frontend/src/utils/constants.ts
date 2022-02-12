import { ProblemStatus } from "./types";

const baseURL = process.env.NODE_ENV === 'production' ? 'https://c2ladders.azurewebsites.net' : "http://localhost:8080";

export const constants = {
	cfAPI: 'https://codeforces.com/api',
	api: `${baseURL}/api`,
	submissionFetchInterval: 30 * 1000,
};

export const cfVerdictToStatusMap: Record<string, ProblemStatus> = {
	'OK': ProblemStatus.AC,
	'WRONG_ANSWER': ProblemStatus.WA,
	'COMPILATION_ERROR': ProblemStatus.CE,
	'RUNTIME_ERROR': ProblemStatus.RE,
	'MEMORY_LIMIT_EXCEEDED': ProblemStatus.MLE,
	'TIME_LIMIT_EXCEEDED': ProblemStatus.TLE,
}

export const problemStatusPriority: Record<ProblemStatus, number> = {
	[ProblemStatus.AC]: 3,
	[ProblemStatus.WA]: 2,
	[ProblemStatus.CE]: 2,
	[ProblemStatus.RE]: 2,
	[ProblemStatus.MLE]: 2,
	[ProblemStatus.TLE]: 2,
	[ProblemStatus.NOTAC]: 1,
	[ProblemStatus.NONE]: 0,
}

export const problemStatusColor: Record<ProblemStatus, string> = {
	[ProblemStatus.AC]: 'rgba(0, 255, 0, 0.5)',
	[ProblemStatus.WA]: 'rgba(255, 0, 0, 0.3)',
	[ProblemStatus.CE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.RE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.MLE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.TLE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.NOTAC]: 'rgba(252, 119, 3, 0.3)',
	[ProblemStatus.NONE]: '#ffffff',
}

export const cfRankColor: Record<string, string> = {
	'newbie': '#CCCCCC',
	'pupil': '#77FF78',
	'specialist': '#77DDBB',
	'expert': '#ABAAFF',
	'candidate master': '#FF88FF',
	'master': '#FFCC88',
	'international master': '#FFBB55',
	'grandmaster': '#FF7777',
	'international grandmaster': '#FF3333',
	'legendary grandmaster': '#AA0001',
}
