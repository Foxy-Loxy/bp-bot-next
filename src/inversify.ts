import { Container } from 'inversify';
import { DiscordServiceContract } from './contract/service/discord.contract';
import { DiscordService } from './service/discord.service';
import { commandIdentifiers, serviceIdentifiers } from './constant/inversify';
import { DiscordConfigurationContract } from './contract/config/discord.contract';
import { discordConfiguration } from './config/discord';
import { CommandContract } from './contract/common/command';
import { PingCommand } from './command/ping';
import { LoggerServiceContract } from './contract/service/config.contract';
import { LoggerService } from './service/logger.service';

export const container = new Container();

container.bind<DiscordServiceContract>(serviceIdentifiers.DiscordService).to(DiscordService).inSingletonScope();
container.bind<DiscordConfigurationContract>(serviceIdentifiers.DiscordConfiguration).toConstantValue(discordConfiguration);

container.bind<CommandContract>(commandIdentifiers.PingCommand).to(PingCommand);

container.bind<LoggerServiceContract>(serviceIdentifiers.LoggerService).to(LoggerService).onActivation((context, loggerInstance) => {
    if (context.currentRequest.parentRequest?.bindings[0].implementationType) {
        const constructorName = (context.currentRequest.parentRequest?.bindings[0].implementationType as Function).name;
        loggerInstance.setContext(constructorName);
    }
    return loggerInstance;
});
