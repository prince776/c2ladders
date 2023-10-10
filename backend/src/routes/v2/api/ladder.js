"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cache_1 = __importDefault(require("../../../utils/cache"));
const utils_1 = require("../../../utils/utils");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const ladderLimit = 100;
const fetchLadderLimit = 120;
const absolutePath = path_1.default.resolve(__dirname, "../../../data/problems_v2.json");
const jsonData = fs.readFileSync(absolutePath, "utf8");
const problems = JSON.parse(jsonData);
const isEligibleForCache = (startRating, endRating) => {
    const start = parseInt(startRating, 10);
    const end = parseInt(endRating, 10);
    if (start % 100 == 0 && end % 100 == 0 && end - start === 100) {
        return true;
    }
    return false;
};
router.get("/ladder", (req, res) => {
    console.log("v2");
    const { startRating, endRating } = req.query;
    if (!startRating || !endRating) {
        return (0, utils_1.sendError)(res, "Missing startRating or endRating", "Missing startRating or endRating", 400);
    }
    if (isNaN(parseInt(startRating, 10)) ||
        isNaN(parseInt(endRating, 10))) {
        return (0, utils_1.sendError)(res, "Invalid startRating or endRating", "Invalid startRating or endRating", 400);
    }
    const useCache = isEligibleForCache(startRating, endRating);
    if (useCache) {
        const cacheKey = `v2:ladder:${startRating}:${endRating}`;
        const result = cache_1.default.get(cacheKey);
        if (result) {
            return (0, utils_1.sendSuccess)(res, "Ladder fetched", result);
        }
    }
    const filteredProblems = problems.filter((problem) => problem.rating >= parseInt(startRating, 10) &&
        problem.rating < parseInt(endRating, 10));
    const sortedProblems = filteredProblems.sort((a, b) => b.frequency - a.frequency);
    const uniqueProblems = new Set();
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
    (0, utils_1.sendSuccess)(res, "Ladder fetched", finalRes);
    if (useCache) {
        const cacheKey = `v2:ladder:${startRating}:${endRating}`;
        cache_1.default.set(cacheKey, finalRes);
    }
});
module.exports = router;
