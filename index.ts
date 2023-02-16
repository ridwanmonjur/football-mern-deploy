
/*  Imported libraries */

import * as express from 'express'
import { Application, Request, Response, NextFunction } from 'express'
// import { rainbow } from 'colors'
import * as dotenv from "dotenv"
const path= require("path")

/*  My libraries */

import { connectDB } from './db'
import { resetData } from './seed_function'
import { UserInterface } from './models/User';
import { winstonLogger } from './winston/logger'
// import routes
const routesAuth = require('./routes/auth')
const routesProduct = require('./routes/product')
const routesCart = require('./routes/cart')

/*  Setting up Express */

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
// connect Database
connectDB()
// error handler
// app.use() for mounting routes
process.on('uncaughtException', 
    function(err) {
        // Handle the error safely
        winstonLogger.error(err)
})
app.get('/', (req, res)=>res.json({success: true}))
app.use('/api/v1', routesAuth)
app.use('/api/v1/product', routesProduct)
app.use('/api/v1/cart', routesCart)
app.use('/api/v1/cart', routesCart)
app.get('/api/v1/resetData', function (req: Request, res: Response){
    resetData()
    res.json({success: true})
})

// // All remaining requests return the React app, so it can handle routing.
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, './build', 'index.html'));
// });
const port = process.env.PORT || 8000
app.listen(port, function () {
    // console.log(rainbow('Hello my friend')) // outputs green text
    winstonLogger.info(`App started at port ${port}`)
})

module.exports = app;
