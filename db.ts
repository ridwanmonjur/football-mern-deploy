import { connect } from 'mongoose'
// import { red, rainbow } from 'colors'

import * as dotenv from "dotenv"
import { winstonLogger } from './winston/logger'
// WINDOWS USER
// dotenv.config({ path: __dirname+ "\env\\config.env" })
// UBUNTU USER
dotenv.config({ path: __dirname+ "/env/config.env" })

// let connectionString: string = process.env.DB_CONNECTION + '/' + process.env.DB_TABLE_2

// mongodb://localhost:27017/exampleDb
let connectionString = process.env['DB_CONNECTION']  as any as string
// let connectionString = "mongodb://localhost:27017/ecommerce"


function connectDB(): void {
    connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // Note that mongoose will **not** pull `bufferCommands` from the query string
    })
    .then(()=>{
      winstonLogger.info("Connected to Database")
    })
    .catch(() => {
    winstonLogger.error("Failed to connect to Database")
    //  UnhandledPromiseRejectionWarning: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
  })

}
export { connectDB }