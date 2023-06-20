
import { Problem } from "../utils/types";
import { getProblemID, getProblemLink } from "../utils/utils";
import { constants, problemStatusColor } from "../utils/constants";
import { useState } from "react";



const TableRow = (props: { data: Problem, status: string, index: number }) => {

    const { data, status, index } = props;

    const handleClick = (problem: Problem) => {
        window.open(getProblemLink(problem));
    }




    return (

        <tr className="bg-gray-600" onClick={() => handleClick(data)} role="button">
            <td className="px-6 py-4">
                {index + 1}
            </td>
            <td className="px-6 py-4">
                {data.name}
            </td>
            <td className="px-6 py-4">
                {data.frequency}
            </td>
            <td className="px-6 py-4">
                {data.rating}
            </td>
            <td className={status == "AC" || status == "TLE" ? status === "AC" ? "px-6 py-4 text-green-400" : "px-6 py-4 text-red-400" : "px-6 py-4 text-yellow-300"}>
                {status}
            </td>
        </tr>
    )
}

export default TableRow;


{/* 

    <div className="w-full flex flex-row justify-between bg-gray-600">
            <td className="px-6 py-4">
                {index + 1}
            </td>
            <td className="px-6 py-4">
                {data.name}
            </td>
            <td className="px-6 py-4">
                {data.frequency}
            </td>
            <td className="px-6 py-4">
                {data.rating}
            </td>
            <td className="px-6 py-4">
                {status}
            </td>
        </div>

*/}