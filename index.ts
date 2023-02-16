import * as express from 'express'
import {  Application, Request, Response, NextFunction } from 'express'
import * as dotenv from "dotenv"
const path= require("path")
import { connectDB } from './db'
import { resetData } from './seed_function'
import { winstonLogger } from './winston/logger'
const routesAuth = require('./routes/auth')
const routesProduct = require('./routes/product')
const routesCart = require('./routes/cart')

dotenv.config({ path: './env/config.env' })
const app: Application = express()
var cors = require('cors')
app.use(cors())
// For all fetch requests
// for JSON fetch that involves datatype: Application/ json
// Must specify Content-Type: application/json in req.body
// for parsing application/json
app.use(express.json())
// for Form body parsing application/x-www-form-urlencoded I.E. FORMDATA
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data I.E. FILES
// app.use(upload.array()); 
app.use(cors())
connectDB()
// error handler using event emmitter approach
process.on('uncaughtException', 
    function(err) {
        winstonLogger.error(err)
})
app.get('/', (req: Request, res: Response)=> {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.json(
        {success: true,
        resetData: `${fullUrl}api/v1/resetData`
            })
})
app.use(express.static(__dirname + '/assets/'));
app.use('/api/v1', routesAuth)
app.use('/api/v1/product', routesProduct)
app.use('/api/v1/cart', routesCart)
app.use('/api/v1/cart', routesCart)
app.get('/api/v1/resetData', function (req: Request, res: Response){
    resetData()
    res.json({success: true})
})

const port = process.env.PORT || 8000
app.listen(port, function () {
    winstonLogger.info(`App started at port ${port}`)
})

module.exports = app;
