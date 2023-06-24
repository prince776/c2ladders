"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const problemSchema = new mongoose_1.default.Schema({
    contestId: String,
    index: String,
    name: String,
    tags: [String],
    rating: Number,
    frequency: Number,
});
const Problem = mongoose_1.default.model('Problem', problemSchema);
module.exports = Problem;
