import { UserContextMenuInteraction } from 'discord.js';

export interface CommandContract {
    readonly command: string;

    readonly description: string;

    handle(interaction: UserContextMenuInteraction): Promise<void>;
}
