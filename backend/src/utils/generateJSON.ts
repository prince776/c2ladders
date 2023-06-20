import Problem from "../models/problem";
import fs from "fs";

const generateJSON = async () => {
  const problems = await Problem.find();
  const problemJSON = JSON.stringify(problems);
  console.log(problemJSON);
  fs.writeFileSync("problems.json", problemJSON);
};

export default generateJSON;
