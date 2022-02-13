import NodeCache from "node-cache";

export = new NodeCache({ stdTTL: 200, checkperiod: 120 });
