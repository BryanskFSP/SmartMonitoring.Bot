import {Context} from "../../utils/types";
import {DatabaseController} from "../../rest/DatabaseController";
import {InlineKeyboard} from "grammy";

export const dbStates = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, callback = undefined] = context.split(':');

    const db = await DatabaseController.GetById(id);
    const keyboard = new InlineKeyboard();

    generateStatesButtons(ctx, id, keyboard, callback);

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.dbStates.text', {
            dbName: db.name
        }),
        {
            reply_markup: keyboard,
        },
    );
};


function generateStatesButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard, callback?: string) {
    keyboard.row().text(ctx.i18n.t('commands.dbStates.buttons.full'), `/dbstate ${dbID}:full`);
    keyboard.row().text(ctx.i18n.t('commands.dbStates.buttons.memory'), `/dbstate ${dbID}:memory`);
    keyboard.row().text(ctx.i18n.t('commands.dbStates.buttons.states'), `/dbstate ${dbID}:states`);
    keyboard.row().text(ctx.i18n.t('commands.dbStates.buttons.cachingRatio'), `/dbstate ${dbID}:cr`);
    keyboard.row().text(ctx.i18n.t('commands.dbStates.buttons.cachingIndexesRatio'), `/dbstate ${dbID}:cir`);

    keyboard.row().text(ctx.i18n.t('buttons.back'), `/${callback ?? `dbdetail ${dbID}`}${callback ? ` ${dbID}` : ''}`);
}
