"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendData = (res, message, data, status) => {
    res.status(status).send({
        message,
        data,
    });
};
function sendSuccess(res, message, data, status = 200) {
    sendData(res, message, data, status);
}
exports.sendSuccess = sendSuccess;
function sendError(res, message, errMsg, status = 500) {
    sendData(res, message, { msg: errMsg }, status);
}
exports.sendError = sendError;
