import { Response } from 'express';

const sendData = (res: Response, message: string, data: Object, status: number) => {
    res.status(status).send({
        message,
        data,
    });
};

export function sendSuccess(res: Response, message: string, data: any, status: number = 200) {
    sendData(res, message, data, status);
}

export function sendError(res: Response, message: string, errMsg: string, status: number = 500) {
    sendData(res, message, { msg: errMsg }, status);
}
