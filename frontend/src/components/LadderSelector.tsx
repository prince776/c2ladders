import { LadderData } from "../utils/types";

interface LadderSelectorProps {
	setLadderData: (data: LadderData) => void,
	ladderData: LadderData,
	startRating: number,
	endRating: number,
	step: number,
}

/**
 * Every Ladder range is [X, Y), end is exclusive
 * @param props 
 * @returns 
 */
function LadderSelector(props: LadderSelectorProps) {

	let options: number[][] = [];
	for (let i = props.startRating; i <= props.endRating; i += props.step) {
		let st = i - props.step, ed = i;
		options.push([st, ed]);
	}
	return (
		<div>
			<div className='row flex-row flex-nowrap mb-2 justify-content-center'>
				<div className='col-12 col-md-10 col-lg-9 col-xl-8 text-center'>
				{
					options.map(option => {
						return (
							<button className="col-auto p-2" key={option[0]} onClick={() => props.setLadderData({
								startRating: option[0],
								endRating: option[1],
							})} style={{
								backgroundColor: (option[0] === props.ladderData.startRating && option[1] === props.ladderData.endRating) ? 'rgba(52, 98, 235, 0.6)' : 'white',
							}}> {option[0]}</button>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default LadderSelector;
