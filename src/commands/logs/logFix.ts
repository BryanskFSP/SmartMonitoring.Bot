import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {LogsController} from "../../rest/LogsController";

export const logFix = async (ctx: Context, _, context: string): Promise<void> => {
    let [id = undefined, callback = undefined] = context ? context.split(':') : [];

    if (!id) {
        await ctx.session.addData('command', ctx.data.Message);
        throw ctx.i18n.t('commands.logFix.inputId');
    }

    const keyboard = new InlineKeyboard();
    let isError = false;

    try {
        await LogsController.PostById(id)
    } catch (e) {
        isError = true;
    }

    generateLogFixButtons(ctx, keyboard, isError);

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.logFix.${isError ? 'idIsNotFound' : 'text'}`),
        {
            reply_markup: keyboard,
        },
    );
};

function generateLogFixButtons(ctx: Context, keyboard: InlineKeyboard, isError: boolean = false) {
    keyboard.row().text(ctx.i18n.t('buttons.back'), isError ? '/logfix' : `/logs`);
    keyboard.row().text(ctx.i18n.t('buttons.start'), '/start');
}
