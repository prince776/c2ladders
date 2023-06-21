import { Problem } from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils";


const TableRow = (props: { data: Problem; status: string; index: number }) => {
  const { data, status, index } = props;

  const handleClick = (problem: Problem) => {
    window.open(getProblemLink(problem));
  };


  return (
    <tr
      className={`bg-color table-row ${status == "AC"
          ? "bg-green"
          : status == "TLE" || status == "WA" || status == "RE"
            ? "bg-red"
            : ""
        }`}
      onClick={() => handleClick(data)}
      role="button"
    >
      <td>{index + 1}</td>
      <td>{data.name}</td>
      <td>{data.frequency}</td>
      <td>{data.rating}</td>
      <td
        className={
          status == "AC" || status == "TLE" || status == "WA" || status == "RE"
            ? status === "AC"
              ? "bg-color-green"
              : "text-red-400"
            : "text-yellow-300"
        }
      >
        {status}
      </td>
    </tr>
  );
};

export default TableRow;


