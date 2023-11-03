import { container } from 'tsyringe';
import { BotClient } from '../client/client';
import { commandHandler } from './commandHandler';
import { Context } from '../utils/types';

const bot = container.resolve(BotClient);
// @ts-ignore
bot.on('callback_query', async (ctx: Context) => {
  if (!process.env.MESSAGE_HANDLING) return;
  await commandHandler(ctx);
});
