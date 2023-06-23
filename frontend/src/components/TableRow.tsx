import { Problem } from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils";


const TableRow = (props: { data: Problem; status: string; index: number; tagStatus: boolean }) => {
  const { data, status, index, tagStatus } = props;

  const handleClick = (problem: Problem) => {
    window.open(getProblemLink(problem));
  };


  return (
    <tr
      className={`bg-color table-row ${status === "AC"
        ? "bg-green"
        : status === "TLE" || status === "WA" || status === "RE"
          ? "bg-red"
          : ""
        }`}
      onClick={() => handleClick(data)}
      role="button"
    >
      <td>{index + 1}</td>
      <td>{data.name}</td>

      {tagStatus &&

        <td className="text-sm flex flex-wrap justify-center">{data.tags.map((text, idx) => {
          return (
            <button className="bg-aCodeBlue/[0.9] border text-gray-100 hover:text-white py-1 px-2 m-1 rounded-full align-middle">
              {text}
            </button>
          )
        })}
        </td>
      }
      <td>{data.frequency}</td>
      <td>{data.rating}</td>
      <td
        className={
          status === "AC" || status === "TLE" || status === "WA" || status === "RE"
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


