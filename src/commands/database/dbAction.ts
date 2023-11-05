import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {PSQLController} from "../../rest/PSQLController";

export const dbAction = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, actionName = ''] = context.split(':');

    const keyboard = new InlineKeyboard();

    generateActionButtons(ctx, id, keyboard);
    await callActionMethod(actionName, id);

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.dbAction.text`, {
            actionName: getActionName(actionName)
        }),
        {
            reply_markup: keyboard,
        },
    );
};


function generateActionButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard) {
    keyboard.row().text(ctx.i18n.t('buttons.back'), `/dbactions ${dbID}`);
}
function getActionName(checkName: string): string {
    switch (checkName) {
        case 'clearscript':
            return 'скриптом';
        case 'clearvacuum':
            return 'методом Вакуума';
        default:
            return 'UnknownType';
    }
}
async function callActionMethod(actionName: string, id: string): Promise<void> {
    switch (actionName) {
        case 'clearscript':
            await PSQLController.ClearSpace(id);
            break;
        case 'clearvacuum':
            await PSQLController.ClearSpaceVacuum(id);
            break;
    }
}
