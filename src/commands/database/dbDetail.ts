import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {DatabaseController} from "../../rest/DatabaseController";
import {DataBaseViewModel} from "../../models/DataBaseViewModel";

export const dbDetail = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, callback = undefined] = context.split(':');

    const db = await DatabaseController.GetById(id);
    const keyboard = new InlineKeyboard();

    generateDBButtons(ctx, db, keyboard, callback);

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.db.text', {
            dbName: db.name,
            dbInfo: getDBInfo(ctx, db)
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateDBButtons(ctx: Context, db: DataBaseViewModel, keyboard: InlineKeyboard, callback?: string) {
    keyboard.row().text(ctx.i18n.t('commands.db.buttons.logs'), `/logsdetail ${db.id}:dbdetail`);
    keyboard.row().text(ctx.i18n.t('commands.db.buttons.statuses'), `/dbstatuses ${db.id}:dbdetail`);
    keyboard.row().text(ctx.i18n.t('commands.db.buttons.actions'), `/dbactions ${db.id}:dbdetail`);
    keyboard.row().text(ctx.i18n.t('commands.db.buttons.checks'), `/dbstates ${db.id}`);
    keyboard.row().text(ctx.i18n.t('commands.db.buttons.back'), `/${callback ?? 'db'}${callback ? ` ${db!.id}` : ''}`);
}
function getDBInfo(ctx: Context, db: DataBaseViewModel): string {
    return `Id: ${db.id}\n` +
        `Name: ${db.name}\n` +
        `DataBase: ${db.database}\n` +
        `Host: ${db.host}\n` +
        `description: ${db.description}\n` +
        `Organization: ${db.organizationID}`;
}
