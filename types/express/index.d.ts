/* 0.a. SAMPLE COMMENT */


/* 0.b. What I learnt */
// import "express"
// cannot access express in:  
// const app= express()

// Solution: 
// import express from 'express'
// import * as express from 'express'


// 1. extend typescript request object
export {};

declare global {
    namespace Express {
        interface Request {
            user: string
            role: string
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECTION: string;
        }
      }
}
