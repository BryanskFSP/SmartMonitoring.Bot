import {Context} from '../../utils/types';
import {InlineKeyboard} from 'grammy';
import {TelegramUserViewModel} from "../../models/TelegramUserViewModel";
import {TelegramUserService} from "../../services/TelegramUserService";

export const start = async (ctx: Context, user: TelegramUserViewModel, keyword?: string): Promise<void> => {
    if (!user) {
        if (!keyword) {
            await ctx.session.addData('command', ctx.data.Message);
            throw ctx.i18n.t('commands.start.isNotAuth');
        } else if (!await TelegramUserService.CreateUser(ctx, keyword)) {
            throw ctx.i18n.t('commands.start.userErrorCreate');
        }
    }

    const keyboard = new InlineKeyboard().text(ctx.i18n.t('commands.profile.button'), '/profile');
    let subtext = ""

    console.log(keyword ?? 'NULL KEYWORD', user)

    keyboard.row().text(ctx.i18n.t('commands.dbs.button'), '/db');
    keyboard.row().text(ctx.i18n.t('commands.logs.button'), '/logs');
    keyboard.row().text(ctx.i18n.t('commands.credits.button'), '/credits');

    await ctx.SendOrEditMessage(`${ctx.i18n.t('commands.start.text')}\n\n${subtext}`, {
        reply_markup: keyboard,
    });
};
