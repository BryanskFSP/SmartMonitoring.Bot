import {Context} from '../../utils/types';
import {InlineKeyboard} from 'grammy';
import {TelegramUserViewModel} from "../../models/TelegramUserViewModel";

export const start = async (ctx: Context, user: TelegramUserViewModel): Promise<void> => {
    const keyboard = new InlineKeyboard().text(ctx.i18n.t('commands.profile.button'), '/profile');
    let subtext = ""
    keyboard.row().text(ctx.i18n.t('commands.groupschedule.buttons.button'), '/groupschedule');
    keyboard.row().text(ctx.i18n.t('commands.callschedule.button'), '/callschedule');
    keyboard.row().text(ctx.i18n.t('commands.credits.button'), '/credits');
    await ctx.SendOrEditMessage(`${ctx.i18n.t('commands.start')}\n\n${subtext}`, {
        reply_markup: keyboard,
    });
};
