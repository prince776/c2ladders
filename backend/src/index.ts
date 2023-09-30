import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

import mongoose from "mongoose";
import path from "path";

const db = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};
// mongoose.connect(`mongodb+srv://${db.user}:${db.pass}@mongodb-cluster.5gkbu.mongodb.net/competitive-programming?retryWrites=true&w=majority`);
mongoose.connect(
  `mongodb+srv://${db.user}:${db.pass}@cluster0.robkk.mongodb.net/test?retryWrites=true&w=majority`
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: ["http://localhost:3000"],
  })
);
app.get("/health", (req: Request, res: Response) => {
  res.send("C2Ladders backend working...");
});

app.use("/", require("./routes/router"));

if (process.env.NODE_ENV === "production") {
  console.log("env is prod");
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    console.log("req: ", req.url);
    res.sendFile(
      path.resolve(__dirname, "..", "..", "frontend", "build", "index.html")
    );
  });
} else {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

export = app;
