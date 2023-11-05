import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";

export const dbActions = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, callback = undefined] = context.split(':');

    const keyboard = new InlineKeyboard();

    generateActionsButtons(ctx, id, keyboard, callback);

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.dbActions.text'),
        {
            reply_markup: keyboard,
        },
    );
};


function generateActionsButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard, callback?: string) {
    keyboard.row().text(ctx.i18n.t('commands.dbActions.buttons.script'), `/dbaction ${dbID}:clearscript`);
    keyboard.row().text(ctx.i18n.t('commands.dbActions.buttons.vacuum'), `/dbaction ${dbID}:clearvacuum`);

    keyboard.row().text(ctx.i18n.t('buttons.back'), `/${callback ?? `dbdetail ${dbID}`}${callback ? ` ${dbID}` : ''}`);
}
