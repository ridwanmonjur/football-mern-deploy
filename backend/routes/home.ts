var express = require('express');
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { APIError } from '../exceptions/AppError';
import { deleteData, resetData, resetProduct } from '../resetData/seed_function'
import { request } from 'http';
const router = express.Router();
const fs = require("fs");
const path = require("path");


router.get('/api/v1/resetFile', (req: Request, res: Response) => {
    const directoryList = ["./assets/accessories", "./assets/boots", "./assets/jerseys", "./assets/uploads"];
    for (const directory of directoryList) {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                console.log({ file })
                if (String(file).match('multerCustomImage')) {
                    fs.unlink(path.join(directory, file), (err) => {
                        if (err) throw err;
                    });
                }
            }
        });
    }
    res.status(StatusCodes.OK).json({ done: true })
})


router.get('/', (req: Request, res: Response) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const { query: search, params } = req;
    const json = JSON.stringify(search)
    const queryStr = json.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    const parse = JSON.parse(queryStr);
    const { sort, select, offset, page, limit, ...rest } = parse
    const query = { ...rest }
    const options = { sort, select, offset, page }
    res.status(StatusCodes.OK).json(
        {
            query,
            options,
            search,
            params,
            // json,
            // parse,
            // queryStr,
            success: true,
            resetData: `${fullUrl}api/v1/resetData`,
            assets: `${fullUrl}assets/boots/image0.jpg`,
            assetsLink: `${__dirname}/assets/`,
            deleteData: `${fullUrl}api/v1/deleteData`,
            product: `${fullUrl}api/v1/product`,
            error: `${fullUrl}error`
        });
})

router.get('/api/v1/resetData', async function (_req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ success: true, users: await resetData() })
})

router.get('/api/v1/resetProduct', async function (_req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ success: true, products: await resetProduct() })
})

router.get('/api/v1/deleteData', function (_req: Request, res: Response) {
    deleteData()
    res.status(StatusCodes.OK).json({ success: true })
})

router.get('/error', function (_req: Request, _res: Response) {
    throw new APIError("This is the description", StatusCodes.BAD_REQUEST)
})

module.exports = router