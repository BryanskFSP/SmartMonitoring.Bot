import {Context} from "../../utils/types";
import {DatabaseController} from "../../rest/DatabaseController";
import {InlineKeyboard} from "grammy";
import {PSQLController} from "../../rest/PSQLController";

export const dbStatus = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, checkName = ''] = context.split(':');

    const keyboard = new InlineKeyboard();
    const db = await DatabaseController.GetById(id);

    generateStateButtons(ctx, id, keyboard);

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.dbStatus.text`, {
            checkName: getCheckName(ctx, checkName),
            dbName: db.name,
            dbStatus: await getCheckData(ctx, checkName, id)
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateStateButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard) {
    keyboard.row().text(ctx.i18n.t('buttons.back'), `/dbstatuses ${dbID}`);
}
function getCheckName(ctx: Context, checkName: string): string {
    switch (checkName) {
        case 'memory':
            return ctx.i18n.t('commands.dbStatus.textAdditional.memory');
        case 'top':
            return ctx.i18n.t('commands.dbStatus.textAdditional.top');
        case 'cr':
            return ctx.i18n.t('commands.dbStatus.textAdditional.cr');
        case 'cir':
            return ctx.i18n.t('commands.dbStatus.textAdditional.cir');
        case 'wasted':
            return ctx.i18n.t('commands.dbStatus.textAdditional.wasted');
        case 'bp':
            return ctx.i18n.t('commands.dbStatus.textAdditional.bp');
        case 'si':
            return ctx.i18n.t('commands.dbStatus.textAdditional.si');
        case 'soi':
            return ctx.i18n.t('commands.dbStatus.textAdditional.soi');
        default:
            return 'UnknownType';
    }
}
async function getCheckData(ctx: Context, checkName: string, id: string): Promise<string> {
    switch (checkName) {
        case 'memory':
            const tableMemory = (await PSQLController.GetTablesMemory(id)).data;
            return `Type: ${tableMemory.type}\n` +
                `Total: ${tableMemory.total}\n` +
                `Used: ${tableMemory.used}\n` +
                `Avail: ${tableMemory.avail}`;
        case 'top':
            const tableTop = (await PSQLController.GetTablesTop(id)).data;
            return tableTop.map(el => `> ${el.name}: ${el.operationsCount}`).join('\n');
        case 'cr':
            const tableCachingRatio = await PSQLController.GetTablesCachingRatio(id);
            return `Caching Ratio: ${tableCachingRatio.data}`;
        case 'cir':
            const tableCachingIndexingRatio = await PSQLController.GetTablesCachingIndexesRatio(id);
            return `Caching Indexing Ratio: ${tableCachingIndexingRatio.data}`;
        case 'wasted':
            const wastedBytes = await PSQLController.GetWastedBytes(id);
            return `Wasted: ${wastedBytes.data} Bytes`;
        case 'bp':
            const blockedProcesses = (await PSQLController.GetBlockedProcesses(id)).data;
            if (!blockedProcesses.length) return ctx.i18n.t('commands.dbStatus.empty.bp');
            return blockedProcesses.map(el =>
                `Locked Item: ${el.lockedItem}\n` +
                `Warning Duration: ${el.warningDuration}\n` +
                `Blocked PID: ${el.blockedPID}\n` +
                `Blocked Query: ${el.blockedQuery}\n` +
                `Blocked Mode: ${el.blockedMode}`
            ).join('\n\n');
        case 'si':
            const statsIndexes = (await PSQLController.GetIndexesStats(id)).data;
            return statsIndexes.map(el =>
                `Name: ${el.relName}\n` +
                `SeqScan: ${el.seqScan}\n` +
                `IdxScan: ${el.idxScan}\n` +
                `IndexStat: ${el.indexStat}`
            ).join('\n\n');
        case 'soi':
            const statsOldIndexes = (await PSQLController.GetOutdatedIndexesStats(id)).data;
            return statsOldIndexes.map(el =>
                `Name: ${el.relname}\n` +
                `Stats: ${el.stats}`
            ).join('\n\n');
        default:
            return '';
    }
}
