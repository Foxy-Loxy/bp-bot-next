import winston from 'winston';
import { LoggerServiceContract } from '../contract/service/config.contract';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements LoggerServiceContract {
    public winston: winston.Logger;

    public debug: winston.LeveledLogMethod;

    public error: winston.LeveledLogMethod;

    public info: winston.LeveledLogMethod;

    public warn: winston.LeveledLogMethod;

    setContext(contextName: string): void {
        this.winston.defaultMeta.context = contextName;
    }

    constructor() {
        this.winston = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.colorize({ all: true }),
            ),
            defaultMeta: {
                context: 'global',
            },
            transports: [
                new winston.transports.Console(),
            ],
        });
        this.debug = this.winston.debug.bind(this.winston);
        this.error = this.winston.error.bind(this.winston);
        this.info = this.winston.info.bind(this.winston);
        this.warn = this.winston.warn.bind(this.winston);
    }
}
