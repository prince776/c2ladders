import React, { useState } from "react";
import { cfRankColor } from "../utils/constants";
import { UserData, UserStats } from "../utils/types";

function Sidebar(props: { userData: UserData; userStats: UserStats; filters: Array<string>; setFilters: (data: Array<string>) => void; filterType: boolean; setFilterType: (data: boolean) => void; }) {
    const { userData, userStats, filters, setFilters, filterType, setFilterType } = props;

    const tags = ['2-sat', 'binary search', 'bitmasks', 'brute force', 'chinese remainder theorem', 'combinatorics', 'constructive algorithms', 'data structures', 'dfs and similar', 'divide and conquer', 'dp', 'dsu', 'expression parsing', 'fft', 'flows', 'games', 'geometry', 'graph matchings', 'graphs', 'greedy', 'hashing', 'implementation', 'interactive', 'math', 'matrices', 'meet-in-the-middle', 'number theory', 'probabilities', 'schedules', 'shortest paths', 'sortings', 'string suffix structures', 'strings', 'ternary search', 'trees', 'two pointers']

    const handleToggleText = (text: string) => {
        if (filters.includes(text)) {
            // If the text is already in the array, remove it
            const updatedFilters = filters.filter((item) => item !== text);
            setFilters(updatedFilters);
        } else {
            // If the text is not in the array, add it
            setFilters([...filters, text]);
        }
    };



    return (
        <div>


            <input
                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={(e) => setFilterType(e.target.checked)}
            />

            <label className="inline pl-[0.15rem] hover:cursor-pointer text-gray-200 text-lg mr-1">
                Filter Logic: {filterType ? "AND" : "OR"}
            </label>

            <div className="border-2 w-full rounded-3xl flex justify-between my-2">

                <div className="text-sm flex flex-wrap justify-items-start m-3 content-center">{tags.map((text, idx) => {

                    return (
                        <Button
                            key={idx}
                            text={text}
                            isTextInArray={filters.includes(text)}
                            onClick={() => handleToggleText(text)}
                        />
                    )
                })}
                </div>

            </div>
        </div>
    );
}


function Button(props: { text: string; isTextInArray: boolean; onClick: () => void }) {
    const buttonCss = props.isTextInArray ? "bg-green-700/[0.9] border text-gray-100 hover:text-white py-1 px-2 m-1 rounded-full align-middle" : "bg-aCodeBlue/[0.9] border text-gray-100 hover:text-white py-1 px-2 m-1 rounded-full align-middle";

    return (
        <button
            onClick={props.onClick}
            className={buttonCss}
        >
            {props.text}
        </button>
    );
}

export default Sidebar;
