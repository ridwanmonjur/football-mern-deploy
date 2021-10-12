/* 0.a. SAMPLE COMMENT */


/* 0.b. What I learnt */
// import "express"
// cannot access express in:  
// const app= express()

// Solution: 
// import express from 'express'
// import * as express from 'express'


// 1. extend typescript request object


declare global {
    namespace Express {
        interface Request {
            newUser: string
            role: string
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECTION: string;
        }
      }
}

/* 2. Imported libraries */

import express, { Application, Request, Response, NextFunction } from 'express'
import { rainbow } from 'colors'
import * as dotenv from "dotenv"
const path= require("path")

/* 3. My libraries */

import { connectDB } from './db'
import { resetData } from './seeder_ecommerce'
import { UserInterface } from './models/User';
// import routes
const routesAuth = require('./routes/auth')
const routesProduct = require('./routes/product')
const routesCart = require('./routes/cart')

/* 4. Setting up Express */

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
app.listen(process.env.PORT || 5000, function () {
    console.log(rainbow('Hello my friend')) // outputs green text
})


/* 4. Exporting Express */

module.exports = app;
