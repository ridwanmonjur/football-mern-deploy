import * as express from 'express'
import { Application, Request, Response, NextFunction } from 'express'
import * as http from 'http'
import * as https from 'https'
import * as cors from 'cors';
import { createHttpTerminator } from 'http-terminator';
import * as dotenv from "dotenv"
import { connectDB } from './db'
import { winstonLogger } from './winston/logger'
import { logError } from './middleware/error/logError'
import { handleError } from './middleware/error/handleError'
const routesUser = require('./routes/user')
const routesProduct = require('./routes/product')
const routesCart = require('./routes/cart')
const routesAuth = require('./routes/auth')
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
app.use(cors(
    {
    origin: '*',
    // origin: ["http://localhost:3000", "http://localhost:3001", "https://admin-football-mern-shop.netlify.app/", "https://football-mern-shop.netlify.app", "https://portfolio-maker.onrender.com"],
    credentials: true,
}
)) // For all fetch requests for JSON  Must specify Content-Type: application/json in fetch
app.use(express.json()) // for Form body parsing application/x-www-form-urlencoded I.E. FORMDATA
// app.use(express.urlencoded({ extended: true })); // for parsing multipart/form-data I.E. FILES // app.use(upload.array()); 
connectDB()

/************************************************************* */
// routes
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/', routesHome);
app.use('/api/v1', routesAuth)
app.use('/api/v1', routesUser)
app.use('/api/v1/product', routesProduct)
app.use('/api/v1/cart', routesCart)
// app.use('/api/v1/bkash', routesBkash)

/************************************************************* */
// error handling
app.use(logError);
app.use(handleError);

/************************************************************* */
setInterval(() => {
    winstonLogger.info({fetched: true})
    https.get("https://portfolio-maker.onrender.com/users/user/default");
    https.get("https://portfolio-maker.onrender.com/users/user/default");
  }, 8 * 60 * 1000); // every 8 min
// Start app
app.listen(port, function () {
    winstonLogger.info(`App started at port ${port}`);
   
})

module.exports = app;
