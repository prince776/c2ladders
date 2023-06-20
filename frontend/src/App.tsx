import React, { useEffect, useState } from "react";

import {
  LadderData,
  ProblemStatusMap,
  UserData,
  UserStats,
} from "./utils/types";
import httpClient from "./utils/http";
import { constants } from "./utils/constants";

import UserCard from "./components/UserCard";
import Header from "./components/Header";
import Ladder from "./components/Ladder";

import LadderSelector from "./components/LadderSelector";
import {
  assignNewStatus,
  fetchUserSubmissionsWithRetry,
  getProblemID,
} from "./utils/utils";
import Footer from "./components/Footer";

import { toast } from "react-toastify";

function App() {
  const [user, setUser] = useState<string>("");
  const [userData, setUserData] = useState<UserData>(null);
  const [userStats, setUserStats] = useState<UserStats>(null);
  const [ladderData, setLadderData] = useState<LadderData>({
    startRating: 1200,
    endRating: 1300,
  });
  const [problemStatusMap, setProblemStatusMap] = useState<ProblemStatusMap>(
    {}
  );
  const [fetchIntervalID, setfetchIntervalID] = useState<NodeJS.Timer | null>(
    null
  );

  const [selected, setSelected] = useState(1200);

  const loadUser = async () => {
    try {
      const userDataRes = await httpClient.request({
        method: "GET",
        url: `${constants.cfAPI}/user.info`,
        params: {
          handles: user,
          lang: "en",
        },
      });
      const userInfo = userDataRes.result[0];
      setUserData({
        handle: userInfo.handle,
        image: userInfo.avatar,
        maxRating: userInfo.maxRating,
        rating: userInfo.rating,
        rank: userInfo.rank,
      });

      const startR = Math.floor(userInfo.rating / 100) * 100 + 200;

      setLadderData({
        startRating: startR,
        endRating: startR + 100,
      });

      setSelected(startR);
      toast.success("CF Handle found 😊");
    } catch (err: any) {
      toast.error("CF Handle not Found Try again");
    }
  };

  const updateProblemStatusMap = async (userData: UserData) => {
    let newMap = {} as ProblemStatusMap;
    const submissions = await fetchUserSubmissionsWithRetry(userData, 3);
    for (const submission of submissions) {
      const problem = { ...submission.problem };
      const id = getProblemID(problem);
      newMap[id] = assignNewStatus(newMap[id], submission.verdict);
    }
    setProblemStatusMap(newMap);
  };

  useEffect(() => {
    if (!userData) return;
    setProblemStatusMap({});
    if (fetchIntervalID) {
      clearInterval(fetchIntervalID);
    }
    updateProblemStatusMap(userData);
    const newFetchIntervalID = setInterval(
      () => updateProblemStatusMap(userData),
      constants.submissionFetchInterval
    );
    setfetchIntervalID(newFetchIntervalID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="w-full bg-color">
      <Header heading="ACD Ladders!" />
      <div className="w-full p-10">
        <div className="top-row">
          <LadderSelector
            showRating={11}
            startRating={900}
            endRating={3600}
            step={100}
            setLadderData={setLadderData}
            ladderData={ladderData}
            selected={selected}
            setSelected={setSelected}
          />

          {/* <div className="flex">
					<div className="">
						<input type="text" placeholder="Search CF Handle" className="form-control" id="inputPassword"
							value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={(e) => {
								if (e.key === 'Enter')
									loadUser();
							}} />
					</div>
					<div className="">
						<button className='btn btn-primary' onClick={loadUser}><i className="bi bi-search"></i> Search</button>
					</div>
				</div> */}

          {/* user iamge removed for while */}
          {/* {
						userData &&
						<div className="pr-2">
							<img className='min-h-10 min-w-10 rounded-full' src={userData.image} alt={userData.handle} />
						</div>
					} */}

          <div className="search-bar relative mx-auto w-auto">
            <input
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5  font-normal text-gray-100 bg-slate-900 rounded-full transition ease-in-outfocus:text-gray-100 "
              placeholder="CF Handle"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") loadUser();
              }}
            />
            <button type="submit" className="search-button" onClick={loadUser}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0649 3.85876C15.7041 4.93518 13.4993 7.5813 12.4504 11.7971C10.8772 18.1208 8.92749 18.9272 2.57996 16.678C4.85962 20.8887 9.4801 22.5769 12.4504 22.5769C15.4208 22.5769 23.1138 18.4413 22.2323 10.5802C21.4672 8.29065 20.4114 6.05017 19.0649 3.85876Z"
                  fill="#56D6FF"
                />
                <path
                  d="M21.2687 19.1552L29.5651 27.4652C30.145 28.0451 30.145 28.9852 29.5651 29.5651C28.9852 30.145 28.0451 30.145 27.4652 29.5651L19.1705 21.2568C17.1578 22.824 14.6273 23.7575 11.8788 23.7575C5.3183 23.7575 0 18.4392 0 11.8788C0 5.3183 5.3183 0 11.8788 0C18.4392 0 23.7575 5.3183 23.7575 11.8788C23.7575 14.6203 22.8288 17.145 21.2687 19.1552ZM11.8788 20.7878C16.7991 20.7878 20.7878 16.7991 20.7878 11.8788C20.7878 6.95842 16.7991 2.96969 11.8788 2.96969C6.95842 2.96969 2.96969 6.95842 2.96969 11.8788C2.96969 16.7991 6.95842 20.7878 11.8788 20.7878Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        <UserCard userData={userData} userStats={userStats} />

        <Ladder
          ladderData={ladderData}
          problemStatusMap={problemStatusMap}
          setUserStats={setUserStats}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
