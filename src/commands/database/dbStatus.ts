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
            checkName: getCheckName(checkName),
            dbName: db.name,
            dbStatus: await getCheckData(checkName, id)
        }),
        {
            reply_markup: keyboard,
        },
    );
};

function generateStateButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard) {
    keyboard.row().text(ctx.i18n.t('buttons.back'), `/dbstatuses ${dbID}`);
}
function getCheckName(checkName: string): string {
    switch (checkName) {
        case 'memory':
            return 'использованию памяти';
        case 'top':
            return 'использованию процессов';
        case 'cr':
            return 'использованию кэшированию';
        case 'cir':
            return 'использованию кэшированию индексов';
        case 'wasted':
            return 'раздутию базы данных';
        case 'bp':
            return 'заблокированных процессам';
        case 'si':
            return 'индексам';
        case 'soi':
            return 'старым индексам';
        default:
            return 'UnknownType';
    }
}
async function getCheckData(checkName: string, id: string): Promise<string> {
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
            if (!blockedProcesses.length) return '⚡ Заблокированные процессы не найдены';
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
