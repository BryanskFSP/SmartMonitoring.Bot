import {Context} from "../../utils/types";
import {TelegramUserSession, TelegramUserViewModel} from "../../models/TelegramUserViewModel";
import {InlineKeyboard} from "grammy";
import {PSQLController} from "../../rest/PSQLController";

export const services = async (ctx: Context, user: TelegramUserViewModel): Promise<void> => {
    const services = await PSQLController.GetServices();
    const keyboard = new InlineKeyboard();

    keyboard.row().text(ctx.i18n.t('buttons.start'), '/start');

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.services.text', {
            servicesList: generateListServices(services),
            warningText: ctx.i18n.t('commands.notification.warning'),
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateListServices(services: TelegramUserSession[]): string {
    const messageServices: string[] = [];

    for (const service of services) {
        messageServices.push(
        `DB Name: ${service.datName}\n` +
        `PID: ${service.pid}\n` +
        `StartedAt: ${new Date(service.backendStart).toLocaleString()}\n` +
        `Use Name: ${service.usename}\n` +
        `Status: ${service.state === 'active' ? '✅' : '❌'}`);
    }

    return messageServices.join('\n\n');
}
