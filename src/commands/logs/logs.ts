import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {DatabaseController} from "../../rest/DatabaseController";
import {DataBaseViewModel} from "../../models/DataBaseViewModel";

export const logs = async (ctx: Context): Promise<void> => {
    const dbs = await DatabaseController.GetAll();
    const keyboard = new InlineKeyboard();

    generateLogsButtons(ctx, dbs, keyboard);

    keyboard.row().text(ctx.i18n.t('buttons.start'), '/start');

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.logs.text', {
            dbList: generateListDB(ctx, dbs)
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateLogsButtons(ctx: Context, dbs: DataBaseViewModel[], keyboard: InlineKeyboard) {
    for (const db of dbs) {
        keyboard
            .row()
            .text(
                ctx.i18n.t('commands.logs.buttons.db', {
                    dbName: db.name
                }),
                `/logsdetail ${db.id}`
            );
    }

    keyboard.row().text(ctx.i18n.t('commands.logs.buttons.all'), '/logsdetail');
}
function generateListDB(ctx: Context, dbs: DataBaseViewModel[]): string {
    const messageDbs: string[] = [];

    for (const db of dbs) messageDbs.push(`- ${db.name} [${db.id}]\n`);

    return messageDbs.length ? messageDbs.join('\n\n') : ctx.i18n.t('commands.dbs.emptyList');
}
