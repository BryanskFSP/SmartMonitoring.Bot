import {CronJob} from 'cron';
import moment, {Moment} from "moment";
import {container} from "tsyringe";
import {BotClient} from "../../client/client";
import {TelegramUserController} from "../../rest/TelegramUserController";
import {I18n} from "@grammyjs/i18n";


// test passed

// todo checking and refactoring.
const fiveMinutesCron = async () => {
    const bot = container.resolve(BotClient);
    const i18n = container.resolve(I18n)
};

export const onFiveMinutesCron = new CronJob('00 */5 * * * *', fiveMinutesCron);
