import express, { Request, Response } from "express";
const router = express.Router();

router.use("/", require("./api/ladder"));
router.use("/analysis", require("./api/analysis"));

export = router;
