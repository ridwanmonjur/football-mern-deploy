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
    interface PaginateResult<T> {
        docs: T[];
        totalDocs: number;
        limit: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        page?: number | undefined;
        totalPages: number;
        offset: number;
        prevPage?: number | null | undefined;
        nextPage?: number | null | undefined;
        pagingCounter: number;
        meta?: any;
        [customLabel: string]: T[] | number | boolean | null | undefined;
      }
    namespace Express {
        interface Request {
            userID: string
            role: string
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECTION: string;
        }
      }
}
