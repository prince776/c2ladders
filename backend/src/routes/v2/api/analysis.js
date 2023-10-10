"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../../utils/utils");
const analysis_1 = __importDefault(require("../../../models/analysis"));
const router = express_1.default.Router();
// router.get("/", async (req: Request, res: Response) => {
//   const data = await Analysis.find();
//   sendSuccess(res, "Ladder fetched", data);
// });
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield analysis_1.default.findByIdAndUpdate("649659a4469ae004183c3d21", {
        $inc: { hits: 1 },
    });
    (0, utils_1.sendSuccess)(res, "Ladder fetched", data);
}));
module.exports = router;
