import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

const app = express();
const port = process.env.PORT || 8080;

const db = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};
mongoose.connect(
  `mongodb+srv://i_pranav:HcMhHz8E5EumvEVm@cluster0.eowk9mo.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("connected to db");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/health", (req: Request, res: Response) => {
  res.send("ACDLadders backend working...");
});

app.use("/", require("./routes/router"));

if (process.env.NODE_ENV === "production") {
  console.log("env is prod");
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/", (req, res) => {
    console.log("req: ", req.url);
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
