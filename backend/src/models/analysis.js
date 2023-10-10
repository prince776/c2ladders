"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const analysisSchema = new mongoose_1.default.Schema({
    hits: { type: Number, default: 0 },
    hits_v2: { type: Number, default: 0 },
});
const Analysis = mongoose_1.default.model("Analysis", analysisSchema);
module.exports = Analysis;
