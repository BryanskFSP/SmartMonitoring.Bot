import {Context} from "../../utils/types";
import {DatabaseController} from "../../rest/DatabaseController";
import {InlineKeyboard} from "grammy";
import {DataBaseViewModelStatus} from "../../models/DataBaseViewModel";

export const dbState = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, checkName = ''] = context.split(':');

    const keyboard = new InlineKeyboard();
    const db = await DatabaseController.GetById(id);
    let checkData: DataBaseViewModelStatus;
    let isError = false;

    try {
        checkData = await getCheckData(checkName, id);
    } catch (e) {
        isError = true;
    }

    generateStateButtons(ctx, id, keyboard, isError || !checkData!.status);

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.dbState.text${isError ? 'Error' : ''}`, {
            checkName: getCheckName(ctx, checkName),
            dbName: db.name,
            dbStatus: checkData!.status ?? ''
        }),
        {
            reply_markup: keyboard,
        },
    );
};


function generateStateButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard, isError: boolean = false) {
    if (isError) keyboard.row().text(ctx.i18n.t('commands.dbState.buttons.repair'), `/dbrepair ${dbID}`);
    keyboard.row().text(ctx.i18n.t('buttons.back'), `/dbstates ${dbID}`);
}
function getCheckName(ctx: Context, checkName: string): string {
    switch (checkName) {
        case 'full':
            return ctx.i18n.t('commands.dbState.textAdditional.full');
        case 'memory':
            return ctx.i18n.t('commands.dbState.textAdditional.memory');
        case 'states':
            return ctx.i18n.t('commands.dbState.textAdditional.states');
        case 'cr':
            return ctx.i18n.t('commands.dbState.textAdditional.cr');
        case 'cir':
            return ctx.i18n.t('commands.dbState.textAdditional.cir');
        default:
            return 'UnknownType';
    }
}
async function getCheckData(checkName: string, id: string): Promise<DataBaseViewModelStatus> {
    switch (checkName) {
        case 'full':
            return await DatabaseController.CheckFull(id);
        case 'memory':
            return await DatabaseController.CheckMemory(id);
        case 'states':
            return await DatabaseController.CheckStates(id);
        case 'cr':
            return await DatabaseController.CheckCachingRatio(id);
        case 'cir':
            return await DatabaseController.CheckCachingIndexesRatio(id);
        default:
            return {} as DataBaseViewModelStatus;
    }
}
