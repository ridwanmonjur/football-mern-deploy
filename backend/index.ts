import * as express from 'express'
import { Application, Request, Response, NextFunction } from 'express'
import * as dotenv from "dotenv"
import { connectDB } from './db'
import { winstonLogger } from './winston/logger'
import { createHttpTerminator } from 'http-terminator';
import * as http from 'http'
import { logError } from './middleware/error/logError'
import { handleError } from './middleware/error/handleError'
const cors = require('cors')
const routesAuth = require('./routes/auth')
const routesProduct = require('./routes/product')
const routesCart = require('./routes/cart')
// const routesBkash = require('./routes/bkash')
const routesHome = require('./routes/home')
import './process';
dotenv.config({ path: './config.env' })
const port = process.env.PORT || 8000

/************************************************************* */
// Configure application

const app: Application = express()
export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({ server });
app.use(cors()) // For all fetch requests for JSON  Must specify Content-Type: application/json in fetch
app.use(express.json()) // for Form body parsing application/x-www-form-urlencoded I.E. FORMDATA
app.use(express.urlencoded({ extended: true })); // for parsing multipart/form-data I.E. FILES // app.use(upload.array()); 
connectDB()

/************************************************************* */
// routes
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/', routesHome);
app.use('/api/v1', routesAuth)
app.use('/api/v1/product', routesProduct)
app.use('/api/v1/cart', routesCart)
// app.use('/api/v1/bkash', routesBkash)

/************************************************************* */
// error handling
app.use(logError);
app.use(handleError);

/************************************************************* */
// Start app
app.listen(port, function () {
    winstonLogger.info(`App started at port ${port}`);
})

module.exports = app;
