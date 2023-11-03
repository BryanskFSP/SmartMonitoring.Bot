import { container } from 'tsyringe';
import { BotClient } from '../client/client';
import { Context } from '../utils/types';
import { commandHandler } from './commandHandler';

const bot = container.resolve(BotClient);

bot.on('message', async (ctx: Context) => {
  if (!process.env.MESSAGE_HANDLING) return;
  await commandHandler(ctx);
});
