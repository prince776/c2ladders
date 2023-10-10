import express, { Request, Response } from "express";
import cache from "../../../utils/cache";
import { ProblemType } from "../../../utils/types";
import { sendSuccess, sendError } from "../../../utils/utils";
import * as fs from "fs";
import path from "path";

const router = express.Router();

const ladderLimit = 100;
const fetchLadderLimit = 120;

const absolutePath = path.resolve(__dirname, "../../../data/problems_v1.json");

const jsonData = fs.readFileSync(absolutePath, "utf8");
const problems = JSON.parse(jsonData) as ProblemType[];

const isEligibleForCache = (startRating: string, endRating: string) => {
  const start = parseInt(startRating, 10);
  const end = parseInt(endRating, 10);
  if (start % 100 == 0 && end % 100 == 0 && end - start === 100) {
    return true;
  }
  return false;
};

router.get("/ladder", (req: Request, res: Response) => {
  console.log("v1");
  const { startRating, endRating } = req.query;

  if (!startRating || !endRating) {
    return sendError(
      res,
      "Missing startRating or endRating",
      "Missing startRating or endRating",
      400
    );
  }

  if (
    isNaN(parseInt(startRating as string, 10)) ||
    isNaN(parseInt(endRating as string, 10))
  ) {
    return sendError(
      res,
      "Invalid startRating or endRating",
      "Invalid startRating or endRating",
      400
    );
  }

  const useCache = isEligibleForCache(
    startRating as string,
    endRating as string
  );

  if (useCache) {
    const cacheKey = `v1:ladder:${startRating}:${endRating}`;
    const result = cache.get(cacheKey);
    if (result) {
      return sendSuccess(res, "Ladder fetched", result);
    }
  }

  const filteredProblems = problems.filter(
    (problem) =>
      problem.rating >= parseInt(startRating as string, 10) &&
      problem.rating < parseInt(endRating as string, 10)
  );

  const sortedProblems = filteredProblems.sort(
    (a, b) => b.frequency - a.frequency
  );

  const uniqueProblems = new Set<string>();
  const finalRes = [];
  const deltaContestIds = [1, 0, -1];

  for (const problem of sortedProblems) {
    const { contestId, name } = problem;
    const cid = parseInt(contestId, 10);
    let present = false;

    for (const deltaContestId of deltaContestIds) {
      if (uniqueProblems.has(`${cid + deltaContestId}:${name}`)) {
        present = true;
        break;
      }
    }
    uniqueProblems.add(`${cid}:${name}`);
    if (present) {
      continue;
    }
    finalRes.push(problem);
    if (finalRes.length === ladderLimit) {
      break;
    }
  }

  sendSuccess(res, "Ladder fetched", finalRes);
  if (useCache) {
    const cacheKey = `v1:ladder:${startRating}:${endRating}`;
    cache.set(cacheKey, finalRes);
  }
});

export = router;
