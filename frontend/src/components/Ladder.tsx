import { useEffect, useState } from "react";
import { constants, problemStatusColor } from "../utils/constants";
import httpClient from "../utils/http";
import { LadderData, Problem, ProblemStatus, ProblemStatusMap, UserStats } from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils";

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
		const newProblems =  problems.map((problem: Problem) => {
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

	const handleClick = (problem: Problem) => {
		window.open(getProblemLink(problem));
	}

	return (
		<div className='row justify-content-center'>
			<div className='col-12 col-md-10 col-lg-9 col-xl-8 border border-2 shadow p-0'>
				<table className="table table-hover table-borderless">
					<thead className="border-bottom">
						<tr>
							<th className="h5 text-center">Index</th>
							<th className="h5 text-center">Problem</th>
							<th className="h5 text-center">Frequency</th>
							<th className="h5 text-center">Rating</th>
							<th className="h5 text-center">Status</th>
						</tr>
					</thead>
					<tbody>
						{
							problems.map((problem, idx) => {
								const status = problem.status;
								return (
										<tr key={idx} style={{
											backgroundColor: problemStatusColor[status],
										}} onClick={() => handleClick(problem)} role="button">
											<td className="text-center">{idx + 1}</td>
											<td className="text-center">{problem.name}</td>
											<td className="text-center">{problem.frequency}</td>
											<td className="text-center">{problem.rating}</td>
											<td className="text-center">{status}</td>
										</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Ladder;