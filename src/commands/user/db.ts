import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {DatabaseController} from "../../rest/DatabaseController";
import {DataBaseViewModel} from "../../models/DataBaseViewModel";

export const db = async (ctx: Context): Promise<void> => {
    const dbs = await DatabaseController.GetAll();
    const keyboard = new InlineKeyboard();

    generateButtonDB(ctx, dbs, keyboard);

    keyboard.row().text(ctx.i18n.t('buttons.start'), '/start');

    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.dbs.text', {
            dbList: generateListDB(ctx, dbs),
            warningText: ctx.i18n.t('commands.notification.warning'),
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateButtonDB(ctx: Context, dbs: DataBaseViewModel[], keyboard: InlineKeyboard) {
    for (const db of dbs) {
        keyboard
            .row()
            .text(
                ctx.i18n.t('commands.dbs.buttons.open', {
                    dbName: db.name
                }),
                `/dbdetail ${db.id}`
            );
    }
}
function generateListDB(ctx: Context, dbs: DataBaseViewModel[]): string {
    const messageDbs: string[] = [];

    for (const db of dbs) {
        messageDbs.push(
            `Name: ${db.name}\n` +
            `Id: ${db.id}\n` +
            `DataBase: ${db.database}\n` +
            `description: ${db.description}\n` +
            `Organization: ${db.organizationID}`
        );
    }

    return messageDbs.length ? messageDbs.join('\n\n') : ctx.i18n.t('commands.dbs.emptyList');
}
