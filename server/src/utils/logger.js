import fs from "fs";

export const logger = (req, res, next) => {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  req.time = `${formattedDate} - ${formattedTime}`;
  const { url, method, time, body } = req;

  const Content = ` ${url} ${method} ${time} ${
    body ? JSON.stringify(body) : ""
  } \n`;

  fs.appendFile("log.log", Content, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("content added !");
  });

  next();
};

/* 
  import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const customFormat = () =>
  printf(({ level, message, timestamp }) => {
    return `[${timestamp}][${level.toUpperCase()}] : ${message}`;
  });

const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
    new transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({
      filename: "logs/combined.log",
      level: "info",
    })
  );
}

const requestLogger = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
};

export { logger, requestLogger };
 /*
// usage in app.js ----------------------------->

// import {requestLogger} from ''
// app use.(requestLogger)
// -----------------------------Authentication ->

/* import  {logger} from '../utils/logger' 
 const login = () =>{
 if(!user) {
    logger.error('echec de connection pour email : {email}) ;

    return  res.status(401).json({message : 'message '})
 }
 

    when the user login successfully 
    loger .info('error message')
 } */
// ---------------------------------- blogger -->
/*
const blog = blog 

if the blog created successfulyy  : logger.info('message')
else : logger.error('error message')
*/
