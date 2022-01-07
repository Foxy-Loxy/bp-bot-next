import 'reflect-metadata';
import { serviceIdentifiers } from './constant/inversify';
import { container } from './inversify';
import { DiscordServiceContract } from './contract/service/discord.contract';
import { LoggerServiceContract } from './contract/service/config.contract';


const discord = container.get<DiscordServiceContract>(serviceIdentifiers.DiscordService);

const logger = container.get<LoggerServiceContract>(serviceIdentifiers.LoggerService);

logger.info('Starting app up');

discord.init().catch(e => {
    logger.error(`Failed to start app:`, e);
})
