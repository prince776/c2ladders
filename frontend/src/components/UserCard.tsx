import { cfRankColor } from "../utils/constants";
import { UserData, UserStats } from "../utils/types";

function UserCard(props: { userData: UserData, userStats: UserStats }) {
	const { userData, userStats } = props;

	if (!userData) return <div />;
	return (

		<div className='flex w-full px-5 justify-between text-lg font-semibold'>

			<h5 style={{
				color: cfRankColor[userData.rank],
			}}>{userData.handle} ({userData.rank})</h5>
			<h6 className="text-gray-200">Rating: {userData.rating} (Max: {userData.maxRating})</h6>
			{userStats && <h6 className="text-green-200 pr-2">Solved: {userStats.solved}</h6>}
			{userStats && <h6 className="text-red-200">Unsolved: {userStats.unsolved}</h6>}

		</div>

	)
}

export default UserCard;
