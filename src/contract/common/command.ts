import { UserContextMenuInteraction } from 'discord.js';
import { APIApplicationCommandOption } from 'discord-api-types';

export interface CommandContract {
    readonly command: string;

    readonly description: string;

    readonly options: APIApplicationCommandOption[];

    handle(interaction: UserContextMenuInteraction): Promise<void>;
}
