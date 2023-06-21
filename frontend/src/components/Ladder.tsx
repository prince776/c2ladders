import { useEffect, useState } from "react";
import { constants, problemStatusColor } from "../utils/constants";
import httpClient from "../utils/http";
import {
  LadderData,
  Problem,
  ProblemStatus,
  ProblemStatusMap,
  UserStats,
} from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils"; // remove
import TableRow from "./TableRow";

interface LadderProps {
  ladderData: LadderData;
  problemStatusMap: ProblemStatusMap;
  setUserStats: (stats: UserStats) => void;
}

function Ladder(props: LadderProps) {
  const data = props.ladderData;
  const [problems, setProblems] = useState<Problem[]>([]);

  const fetchProblems = async () => {
    const res = await httpClient.request({
      method: "GET",
      url: `${constants.api}/ladder`,
      params: {
        startRating: data.startRating,
        endRating: data.endRating,
      },
    });
    return res.data;
  };

  const updateProblemsWithStatus = (problems: Problem[]) => {
    let solvedCount = 0;
    const newProblems = problems.map((problem: Problem) => {
      const newStatus =
        props.problemStatusMap[getProblemID(problem)] || ProblemStatus.NONE;
      if (newStatus === ProblemStatus.AC) {
        solvedCount++;
      }
      return {
        ...problem,
        status: newStatus,
      };
    });
    props.setUserStats({
      solved: solvedCount,
      unsolved: problems.length - solvedCount,
    });
    setProblems(newProblems);
  };

  useEffect(() => {
    fetchProblems().then((res) => {
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


  return (
    <div className="w-full problem-table text-center">
      <table className="entire-table w-full text-gray-100 text-center border-separate border-spacing-y-2.5">
        <thead className="table-head">
          <tr>
            <th>Index</th>
            <th>Problem</th>
            <th>Frequency</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {problems.map((problem, idx) => {
            const status = problem.status;
            return (
              <TableRow key={idx} data={problem} status={status} index={idx} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Ladder;
