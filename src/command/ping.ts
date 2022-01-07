import { CommandContract } from '../contract/common/command';
import { inject, injectable } from 'inversify';
import { UserContextMenuInteraction } from 'discord.js';
import { serviceIdentifiers } from '../constant/inversify';
import { LoggerServiceContract } from '../contract/service/config.contract';

@injectable()
export class PingCommand implements CommandContract {
    readonly command: string = 'ping';

    readonly description: string = 'Pongs you back with timestamp';

    @inject(serviceIdentifiers.LoggerService)
    private logger: LoggerServiceContract;

    async handle(interaction: UserContextMenuInteraction): Promise<void> {
        this.logger.info(`Got hit to command PING`)
        await interaction.reply('Pong at ' + new Date().getTime());
    }
}
