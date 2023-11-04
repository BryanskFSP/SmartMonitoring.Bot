import {Context} from "../../utils/types";
import {InlineKeyboard} from "grammy";
import {DatabaseController} from "../../rest/DatabaseController";

export const dbRepair = async (ctx: Context, _, context: string): Promise<void> => {
    let [id, checkName = ''] = context.split(':');

    const keyboard = new InlineKeyboard();
    let isError = false;

    try {
        await DatabaseController.FixFull(id);
    } catch (e) {
        isError = true;
    }

    generateRepairButtons(ctx, id, keyboard, isError);

    await ctx.SendOrEditMessage(
        ctx.i18n.t(`commands.dbRepair.text${isError ? 'Error' : ''}`),
        {
            reply_markup: keyboard,
        },
    );
};

function generateRepairButtons(ctx: Context, dbID: string, keyboard: InlineKeyboard, isError: boolean = false) {
    if (isError) keyboard.row().text(ctx.i18n.t('commands.db.buttons.back'), `/dbrepair ${dbID}`);
    keyboard.row().text(ctx.i18n.t('buttons.back'), `/dbstates ${dbID}`);
}
