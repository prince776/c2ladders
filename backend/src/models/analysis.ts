import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  hits: { type: Number, default: 0 },
  hits_v2: { type: Number, default: 0 },
});

const Analysis = mongoose.model("Analysis", analysisSchema);

export = Analysis;
