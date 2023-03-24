import log4js from "log4js";

log4js.configure({
    appenders: {
        consola: { type: "console" },
        warning: { type: "file", filename: "./src/logs/warn.log" },
        error: { type: "file", filename: "./src/logs/error.log" },
        loggerConsola: { type: "logLevelFilter", appender: 'consola', level: 'info' },
        loggerWarning: { type: "logLevelFilter", appender: 'warning', level: 'warn' },
        loggerError: { type: "logLevelFilter", appender: 'error', level: 'error' }
    },
    categories: {
        default: { appenders: ['loggerConsola', 'loggerWarning', 'loggerError'], level: 'all' }
    }
})

const logger = log4js.getLogger()


export { logger };