import { Logger } from '../utils/log/Logger';
import { container } from 'tsyringe';
import { BotClient } from '../client/client';
import { GrammyError, HttpError } from 'grammy';
import {Context} from "../utils/types";

const logger = new Logger('ErrorRejection');
container.register(Logger, { useValue: logger });
const bot = container.resolve(BotClient);

process.on('unhandledRejection', (reason: Error) => {
  logger.Error(`Name: ${reason.name}\nMessage:${reason.message}`);
});

bot.catch((err) => {
  const ctx = err.ctx as Context;
  logger.Error(
    `Error while handling update ${ctx.update.update_id}\nCommand: ${ctx.data.Message}\nUser: ${JSON.stringify(ctx.data.User)}`,
    true,
  );
  const e = err.error;
  if (e instanceof GrammyError) {
    logger.Error(`Error in request:\nDescription: ${e.description}`, true);
  } else if (e instanceof HttpError) {
    logger.Error(`Could not contact Telegram:\n${e}`, true);
  } else {
    logger.Error(`Unknown error:\n${e}`);
  }
});
