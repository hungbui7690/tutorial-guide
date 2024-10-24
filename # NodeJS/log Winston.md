```bash
npm install winston

{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
```


```js
const winston = require('winston')
const { combine, timestamp, json } = winston.format


const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false
})

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  // transports: [new winston.transports.Console()],
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
    }),
    new winston.transports.File({
      filename: 'app-error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: 'app-info.log',
      level: 'info',
      format: combine(infoFilter(), timestamp(), json()),
    }),
  ],
});

// You can start logging through methods on the logger object:
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');
logger.error(new Error("an error"));
```



### Log Rotation

You can create a new log file every day and automatically delete those older than a time period (say 30 days).

```bash
npm install winston-daily-rotate-file
```



```js
const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, json } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [fileRotateTransport],
});
```




