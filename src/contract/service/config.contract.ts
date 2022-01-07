import winston from "winston";

export interface LoggerServiceContract {
    winston: winston.Logger;

    debug: winston.LeveledLogMethod;

    error: winston.LeveledLogMethod;

    info: winston.LeveledLogMethod;

    warn: winston.LeveledLogMethod;

    setContext(contextName: string): void;
}
