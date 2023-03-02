import { connect } from 'mongoose';
import * as dotenv from "dotenv";
import { winstonLogger } from './winston/logger';
dotenv.config({ path: __dirname + "/env/config.env" });  // THIS IS UBUNTU. WINDOWS USER : dotenv.config({ path: __dirname+ "\env\\config.env" })

let connectionString = process.env['DB_CONNECTION'] as any as string;

function connectDB(): void {
  connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => {
      winstonLogger.info("Connected to Database");
    })
    .catch(() => {
      winstonLogger.error("Failed to connect to Database");
    });

}
export { connectDB };