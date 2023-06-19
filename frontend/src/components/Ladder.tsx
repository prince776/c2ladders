import { useEffect, useState } from "react";
import { constants, problemStatusColor } from "../utils/constants";
import httpClient from "../utils/http";
import { LadderData, Problem, ProblemStatus, ProblemStatusMap, UserStats } from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils"; // remove
import TableRow from './TableRow'

interface LadderProps {
	ladderData: LadderData,
	problemStatusMap: ProblemStatusMap,
	setUserStats: (stats: UserStats) => void,
}

function Ladder(props: LadderProps) {
	const data = props.ladderData;
	const [problems, setProblems] = useState<Problem[]>([]);

	const fetchProblems = async () => {
		const res = await httpClient.request({
			method: 'GET',
			url: `${constants.api}/ladder`,
			params: {
				startRating: data.startRating,
				endRating: data.endRating,
			},
		});
		return res.data;
	}

	const updateProblemsWithStatus = (problems: Problem[]) => {
		let solvedCount = 0;
		const newProblems = problems.map((problem: Problem) => {
			const newStatus = props.problemStatusMap[getProblemID(problem)] || ProblemStatus.NONE;
			if (newStatus === ProblemStatus.AC) {
				solvedCount++;
			}
			return {
				...problem,
				status: newStatus,
			}
		});
		props.setUserStats({
			solved: solvedCount,
			unsolved: problems.length - solvedCount,
		})
		setProblems(newProblems);
	}

	useEffect(() => {
		fetchProblems().then(res => {
			res = res.map((element: any) => {
				return { ...element, status: ProblemStatus.NONE };
			});
			updateProblemsWithStatus(res);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.ladderData]);

	useEffect(() => {
		updateProblemsWithStatus(problems);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.problemStatusMap]);

	// remove after
	const handleClick = (problem: Problem) => {
		window.open(getProblemLink(problem));
	}

	return (
		<div className="w-full border border-white rounded-xl text-center my-2 px-2 ">
			<table className="w-full text-gray-100 text-center border-separate border-spacing-y-2.5">
				<thead className="bg-slate-900">
					<tr>
						<th className="px-6 py-4">Index</th>
						<th className="px-6 py-4">Problem</th>
						<th className="px-6 py-4">Frequency</th>
						<th className="px-6 py-4">Rating</th>
						<th className="px-6 py-4">Status</th>
					</tr>
				</thead>
				<tbody>
					{
						problems.map((problem, idx) => {
							const status = problem.status;
							return (

								<TableRow key={idx} data={problem} status={status} index={idx} />

								// <tr key={idx} style={{
								// 	backgroundColor: problemStatusColor[status],
								// }} onClick={() => handleClick(problem)} role="button">
								// 	<td className="text-center">{idx + 1}</td>
								// 	<td className="text-center">{problem.name}</td>
								// 	<td className="text-center">{problem.frequency}</td>
								// 	<td className="text-center">{problem.rating}</td>
								// 	<td className="text-center">{status}</td>
								// </tr>
							)
						})
					}
				</tbody>
			</table>

		</div>
	)
}

export default Ladder;