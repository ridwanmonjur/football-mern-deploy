import { connect } from 'mongoose'
import { red, rainbow } from 'colors'

import * as dotenv from "dotenv"
// WINDOWS USER
// dotenv.config({ path: __dirname+ "\env\\config.env" })
// UBUNTU USER
dotenv.config({ path: __dirname+ "/env/config.env" })

// let connectionString: string = process.env.DB_CONNECTION + '/' + process.env.DB_TABLE_2

// mongodb://localhost:27017/exampleDb
// let connectionString = process.env['DB_CONNECTION']  as any as string
let connectionString = "mongodb://localhost:27017/ecommerce"

console.log({connectionString, path: __dirname+ "\\env\\config.env"})

function connectDB(): void {
  try {
    connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // Note that mongoose will **not** pull `bufferCommands` from the query string
    })

  }
  catch {
    console.log(red('Failed to connect to Database')) // outputs green text
  }
  console.log(rainbow('Connected to Database')) // outputs green text

}
export { connectDB }