import { Client, Collection, Intents, Interaction, UserContextMenuInteraction } from 'discord.js';
import { inject, injectable } from 'inversify';
import { DiscordServiceContract } from '../contract/service/discord.contract';
import { commandIdentifiers, serviceIdentifiers } from '../constant/inversify';
import { container } from '../inversify';
import { CommandContract } from '../contract/common/command';
import { DiscordConfigurationContract } from '../contract/config/discord.contract';
import { Logging } from 'sequelize';
import { LoggerServiceContract } from '../contract/service/config.contract';

@injectable()
export class DiscordService implements DiscordServiceContract{
    @inject(serviceIdentifiers.DiscordConfiguration)
    private configuration: DiscordConfigurationContract;

    @inject(serviceIdentifiers.LoggerService)
    private logger: LoggerServiceContract;

    private commandDictionary = new Map<string, symbol>();

    async init(): Promise<void> {
        const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

        client.on('ready', async () => {
            this.logger.info(`Logged in as ${client.user?.tag}!`);

            const guild = client.guilds.cache.get(this.configuration.guildId);

            let commands;

            if (guild) {
                this.logger.info(`Guild is present. Using it's command pool`);
                commands = guild.commands;
            } else {
                this.logger.info(`Guild is NOT present. Using global command pool`);
                commands = client.application?.commands;
            }

            for (const commandKey in commandIdentifiers) {
                const commandObject = container.get<CommandContract>(commandIdentifiers[commandKey]);

                const { command, description } = commandObject;

                this.logger.info(`Registering command ${command.toUpperCase()} with description: ${description}`);

                this.commandDictionary.set(command, commandIdentifiers[commandKey]);

                await commands?.create({
                    name: command,
                    description,
                });

                this.logger.info(`Successfully registered command ${command.toUpperCase()}`);
            }
        });

        client.on('interactionCreate', (interaction: Interaction) => {
            // @ts-ignore
            container.get<CommandContract>(this.commandDictionary.get(interaction.commandName) as symbol).handle(interaction);
        })


        await client.login(this.configuration?.token);
    }
}
