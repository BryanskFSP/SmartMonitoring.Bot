import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {LogsController} from "../../rest/LogsController";
import {LogsViewModel} from "../../models/LogsViewModel";

export const logFix = async (ctx: Context, _, context?: string): Promise<void> => {
    let [id = undefined, callback = undefined] = context ? context.split(':') : [];

    let log: LogsViewModel;
    const keyboard = new InlineKeyboard();

    if (id) await LogsController.PostById(id);

    keyboard.row().text(ctx.i18n.t('buttons.start'), '/start');

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.logFix.text`),
        {
            reply_markup: keyboard,
        },
    );
};