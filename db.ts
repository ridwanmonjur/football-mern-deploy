import { connect } from 'mongoose'
import { red, rainbow } from 'colors'

import * as dotenv from "dotenv"
dotenv.config({ path: __dirname+ "\\env\\config.env" })

// let connectionString: string = process.env.DB_CONNECTION + '/' + process.env.DB_TABLE_2


let connectionString:string = process.env['DB_CONNECTION'] as string
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