import { cfRankColor } from "../utils/constants";
import { UserData } from "../utils/types";

function UserCard(props: { userData: UserData }) {
	const userData = props.userData;


	if (!userData) return <div />;
	return (

		<div className='row mb-3 justify-content-center'>
			<div className='col-auto'>
				<div className='row justify-content-center border border-dark rounded shadow p-2 bg-white'>
					<div className='col-auto my-auto'>
						<img className='img-fluid' src={userData.image} alt={userData.handle} />
					</div>
					<div className='col-auto my-auto'>
						<h5 style={{
							color: cfRankColor[userData.rank],
						}}>{userData.handle} ({userData.rank})</h5>
						<h6>Rating: {userData.rating} (Max: {userData.maxRating})</h6>
					</div>
				</div>
		 	</div>
		 </div>
	)
}

export default UserCard;
