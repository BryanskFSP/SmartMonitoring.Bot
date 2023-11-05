import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {LogsController} from "../../rest/LogsController";
import {DataBaseViewModel} from "../../models/DataBaseViewModel";
import {DatabaseController} from "../../rest/DatabaseController";
import {LogsViewModel} from "../../models/LogsViewModel";

export const logsDetail = async (ctx: Context, _, context?: string): Promise<void> => {
    let [id = undefined, callback = undefined] = context ? context.split(':') : [];

    let db: DataBaseViewModel;
    const logs = id ? await LogsController.GetDBById(id) : await LogsController.GetAll();
    const keyboard = new InlineKeyboard();

    if (id) db = await DatabaseController.GetById(id);

    generateLogsButtons(ctx, logs, keyboard, db!, callback);

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.log.text${id ? 'Once' : 'All'}`, {
            ...(db! ? { dbName: `${db.name} [${db.id}]` } : {}),
            logs: generateLogsMessage(ctx, logs)
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateLogsButtons(ctx: Context, logs: LogsViewModel[], keyboard: InlineKeyboard, db?: DataBaseViewModel, callback?: string) {
    keyboard.row().text(ctx.i18n.t('commands.log.buttons.fix'), `/logfix`);

    if (db) keyboard.row().text(ctx.i18n.t('commands.log.buttons.db'), `/dbdetail ${db.id}:logsdetail`);

    keyboard.row().text(ctx.i18n.t('buttons.back'), `/${callback ?? 'logs'}${callback ? ` ${db!.id}` : ''}`);
}
function generateLogsMessage(ctx: Context, logs: LogsViewModel[], withId: boolean = false) {
    const messageResult: string[] = [];

    for (const log of Object.entries(logs.reverse())) {
        messageResult.push(
            `⚠️ ${+log[0] + 1} - ${withId ? `[${log[1].dataBaseID}]` : ''} ${log[1].description}\n` +
            `ID: ${log[1].id}\n` +
            `Recommendation: ${log[1].action}\n` +
            `Problem Status: ${log[1].fixStatus ? '✅ Solved' : '❌ Not Solved'}\n` +
            `Date: ${(new Date(log[1].createdAt)).toLocaleString()}`
        );
    }

    if (messageResult.length > 10) {
        const message = ctx.i18n.t('commands.log.additional', { countRecords: messageResult.length - 10 });
        messageResult.splice(10);
        messageResult.push(message);
    }

    return messageResult.join('\n\n');
}
