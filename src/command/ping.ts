import { CommandContract } from '../contract/common/command';
import { inject, injectable } from 'inversify';
import { UserContextMenuInteraction } from 'discord.js';
import { serviceIdentifiers } from '../constant/inversify';
import { LoggerServiceContract } from '../contract/service/config.contract';
import { APIApplicationCommandOption, ApplicationCommandOptionType } from 'discord-api-types';

@injectable()
export class PingCommand implements CommandContract {
    readonly command: string = 'ping';

    readonly description: string = 'Pongs you back with timestamp';

    readonly options: APIApplicationCommandOption[] = [
        {
            type: ApplicationCommandOptionType.String,
            name: 'echo',
            required: true,
            description: 'echoes this value back to you'
        }
    ];

    @inject(serviceIdentifiers.LoggerService)
    private logger: LoggerServiceContract;

    async handle(interaction: UserContextMenuInteraction): Promise<void> {
        const echoValue = interaction.options.get('echo');
        this.logger.info(`Got hit to command PING`)
        await interaction.reply('Pong at ' + new Date().getTime() + ` with echo value of "${echoValue?.value}"`);
    }
}
