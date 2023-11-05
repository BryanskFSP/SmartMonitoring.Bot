import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";

export const dbStatuses = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, callback = undefined] = context.split(':');

    const keyboard = new InlineKeyboard();

    generateStatesButtons(ctx, id, keyboard, callback);

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.dbStatuses.text'),
        {
            reply_markup: keyboard,
        },
    );
};


function generateStatesButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard, callback?: string) {
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.memory'), `/dbstatus ${dbID}:memory`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.top'), `/dbstatus ${dbID}:top`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.cachingRatio'), `/dbstatus ${dbID}:cr`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.cachingIndexesRatio'), `/dbstatus ${dbID}:cir`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.blockedProcesses'), `/dbstatus ${dbID}:bp`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.statsIndexes'), `/dbstatus ${dbID}:si`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.statsOldIndexes'), `/dbstatus ${dbID}:soi`);
    keyboard.row().text(ctx.i18n.t('commands.dbStatuses.buttons.wasted'), `/dbstatus ${dbID}:wasted`);

    keyboard.row().text(ctx.i18n.t('buttons.back'), `/${callback ?? `dbdetail ${dbID}`}${callback ? ` ${dbID}` : ''}`);
}
