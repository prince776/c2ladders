"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const db = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
};
mongoose_1.default.connect(`mongodb+srv://i_pranav:HcMhHz8E5EumvEVm@cluster0.eowk9mo.mongodb.net/?retryWrites=true&w=majority`, () => {
    console.log("connected to db");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get("/health", (req, res) => {
    res.send("ACDLadders backend working...");
});
app.use("/", require("./routes/router"));
if (process.env.NODE_ENV === "production") {
    console.log("env is prod");
    app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
    app.get("/", (req, res) => {
        console.log("req: ", req.url);
        res.sendFile(path_1.default.resolve(__dirname, "build", "index.html"));
    });
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
