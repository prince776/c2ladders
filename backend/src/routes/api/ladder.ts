import express, { Request, Response } from 'express';
import { sendSuccess, sendError } from './../../utils';
import Problem from './../../models/problem';

const router = express.Router();

const ladderLimit = 100;

router.get('/ladder', (req: Request, res: Response) => {
	const { startRating, endRating } = req.query;
	Problem.find({
		rating: {
			$gte: startRating,
			$lt: endRating,
		},
	})
	.sort({ frequency: -1 })
	.limit(ladderLimit)
	.exec((err, problems) => {
		if (err) {
			sendError(res, 'Internal Server Error', 'Error while fetching problems');
			return;
		}
		sendSuccess(res, 'Ladder fetched', problems);
	});
});

export = router;
