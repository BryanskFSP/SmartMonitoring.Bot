import {Context} from '../../utils/types';
import {InlineKeyboard} from 'grammy';

export const start = async (ctx: Context): Promise<void> => {
    const keyboard = new InlineKeyboard().text(ctx.i18n.t('commands.profile.button'), '/profile');
    let subtext = ""

    keyboard.row().text(ctx.i18n.t('commands.dbs.button'), '/db');
    keyboard.row().text(ctx.i18n.t('commands.logs.button'), '/logs');
    keyboard.row().text(ctx.i18n.t('commands.credits.button'), '/credits');

    await ctx.SendOrEditMessage(`${ctx.i18n.t('commands.start')}\n\n${subtext}`, {
        reply_markup: keyboard,
    });
};
