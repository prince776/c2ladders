import express, { Request, Response } from 'express';
const router = express.Router();

router.use('/api', require('./api/ladder'));

export = router;
