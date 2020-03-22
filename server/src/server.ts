import dotenv from 'dotenv';
import path from 'path'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../.env')})
}
import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import routes from './routes/routes';

const PORT = process.env.PORT || 3000 

const app = express();
app.use(morgan("dev"))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  key: 'user_sid',
  // cookie: { secure: true } //REQUIRE HTTPS,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  },
}))

app.use('/', routes)

//error handling
import ErrorHandler from './middlewares/error-handler';
import { applyMiddleware } from './lib/helpers';
applyMiddleware(ErrorHandler, app)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
});