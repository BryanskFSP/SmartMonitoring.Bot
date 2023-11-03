import { BotClient } from './client';
import { container } from 'tsyringe';
import { session } from 'grammy';
import { MyContextClass, SessionData } from '../utils/context';
import {onFiveMinutesCron} from "../events/crons/onFiveMinutes";
import moment from "moment";

const bot = new BotClient(process.env.TOKEN, {
    ContextConstructor: MyContextClass,
});

export const startBot = (): void => {
    container.register(BotClient, { useValue: bot });

    bot.start();
    // eslint-disable-next-line no-console
    console.log(`[${moment().format("HH:mm:ss")}] Bot ready!\nMessage handling: ${process.env.MESSAGE_HANDLING}`);
    bot.SendInLogChat(`Bot ready!\nMessage handling: ${process.env.MESSAGE_HANDLING}`);
    bot.use(session({ initial: () => new SessionData() }));

    onFiveMinutesCron.start()
};
