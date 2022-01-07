import { DiscordConfigurationContract } from '../contract/config/discord.contract';

export const discordConfiguration: DiscordConfigurationContract = {
    token: process.env.APP_DISCORD_TOKEN || 'none',
    guildId: process.env.APP_DISCROD_GUILD_ID || 'none',
};
