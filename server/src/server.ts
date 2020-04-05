import dotenv from 'dotenv';
import path from 'path'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../.env')})
}
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import bodyParser from 'body-parser';

import { extractUserFromHeader } from './middlewares/authentication/jwt';
import routes from './routes/routes';

const PORT = process.env.PORT || 3000 

const app = express();
app.use(morgan("dev"))
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(extractUserFromHeader)
app.use('/', routes)

//error handling
import ErrorHandler from './middlewares/error-handler';
import { applyMiddleware } from './lib/helpers';
applyMiddleware(ErrorHandler, app)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
});