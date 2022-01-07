import { IdentifierMap } from '../type/common/common';

export const serviceIdentifiers: IdentifierMap = {
    DiscordService: Symbol.for('DiscordService'),
    DiscordConfiguration: Symbol.for('DiscordConfiguration'),
    LoggerService: Symbol.for('LoggerService'),
};

export const commonIdentifiers: IdentifierMap = {
    Dictionary: Symbol.for('Dictionary'),
}

export const commandIdentifiers: IdentifierMap = {
    PingCommand: Symbol.for('PingCommand'),
};
