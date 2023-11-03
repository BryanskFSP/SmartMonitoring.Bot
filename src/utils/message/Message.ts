/*
 * Copyright (c) 2023.
 * Nikita Shidlovsky (nlk81).
 */

import { BotClient } from '../../client/client';
import { container } from 'tsyringe';
import { getConfig } from '../../config/config';

export class Message {
  public static async SendInLogChat(text: string): Promise<void> {
    const bot = container.resolve(BotClient);
    await bot.api.sendMessage(getConfig().chats.log, text);
  }
}
