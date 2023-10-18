import React from "react";
import { cfRankColor } from "../utils/constants";
import { UserData, UserStats } from "../utils/types";

function Sidebar(props: { userData: UserData; userStats: UserStats; filters: Array<string>; setFilters: (data: Array<string>) => void; }) {
    const { userData, userStats, filters, setFilters } = props;

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
            {userData &&
                <div className="w-full max-w-[300px] p-8 rounded-xl text-gray-800 dark:text-gray-400 overflow-hidden group 
                    hover:shadow-2xl hover:shadow-aCodeSky/50 motion-safe:transition-all motion-safe:duration-700">

                    <figure className="relative w-20 h-20 m-0 mx-auto rounded-full outline outline-offset-4 outline-aCodeSky 
                       before:content-[''] before:absolute before:block before:pointer-events-none before:rounded-full before:h-full before:w-full before:bg-aCodeSky before:-z-[1]
                       group-hover:before:scale-[4.3] motion-safe:before:transition-all 
                       motion-safe:transform-gpu motion-safe:before:duration-500 before:origin-center group-hover:outline-sky-400"
                    >
                        <img
                            className="rounded-full block w-full h-full object-cover z-10 relative border-solid border-2 border-slate-50"
                            src={userData.image}
                            alt="Avatar" />
                    </figure>

                    <header className="motion-safe:translate-y-4 group-hover:translate-y-0 motion-safe:transition-transform motion-safe:transform-gpu motion-safe:duration-500" style={{
                        color: cfRankColor[userData.rank],
                    }}>
                        <h3 className="font-semibold text-2xl text-center mt-6 group-hover:text-gray-50 dark:group-hover:text-gray-800 relative">{userData.handle}</h3>
                        <p className="text-center group-hover:text-gray-50 dark:group-hover:text-gray-800 relative">{userData.rank}</p>
                        <p className="text-center group-hover:text-gray-50 dark:group-hover:text-gray-800 relative">Rating: {userData.rating} (Max: {userData.maxRating})</p>
                    </header>

                    <ul className="flex justify-center space-x-4 mt-16 text-aCodeSky
                   relative">
                        <li>
                            {userStats && <p className="text-green-200">Solved: {userStats.solved}</p>}
                        </li>
                        <li>
                            {userStats && <p className="text-red-200">Unsolved: {userStats.unsolved}</p>}
                        </li>

                    </ul>
                </div>
            }
            <div className="text-sm flex flex-wrap justify-center mt-3">{tags.map((text, idx) => {

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
