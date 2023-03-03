var express = require('express');
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { APIError } from '../exceptions/AppError';
import { deleteData, resetData } from '../resetData/seed_function'
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(StatusCodes.OK).json(
        {
            success: true,
            resetData: `${fullUrl}api/v1/resetData`,
            assets: `${fullUrl}assets/boots/image0.jpg`,
            assetsLink: `${__dirname}/assets/`,
            deleteData: `${fullUrl}api/v1/deleteData`,
            product: `${fullUrl}api/v1/product`,
            error: `${fullUrl}error`
        });
})

router.get('/api/v1/resetData', function (_req: Request, res: Response) {
    resetData()
    res.status(StatusCodes.OK).json({ success: true })
})

router.get('/api/v1/deleteData', function (_req: Request, res: Response) {
    deleteData()
    res.status(StatusCodes.OK).json({ success: true })
})

router.get('/error', function (_req: Request, _res: Response) {
    throw new APIError("This is the description", StatusCodes.BAD_REQUEST)
})

module.exports = router