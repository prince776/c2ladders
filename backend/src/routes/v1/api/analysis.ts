import express, { Request, Response } from "express";
import { sendSuccess, sendError } from "../../../utils/utils";
import Analysis from "../../../models/analysis";

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//   const data = await Analysis.find();
//   sendSuccess(res, "Ladder fetched", data);
// });

router.get("/", async (req: Request, res: Response) => {
  const data = await Analysis.findByIdAndUpdate("649659a4469ae004183c3d21", {
    $inc: { hits: 1 },
  });
  sendSuccess(res, "Ladder fetched", data);
});
export = router;
