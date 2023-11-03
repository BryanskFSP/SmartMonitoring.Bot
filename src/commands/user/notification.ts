/*
 * Copyright (c) 2023.
 * Nikita Shidlovsky (nlk81).
 */

import {Context} from '../../utils/types';
import {InlineKeyboard} from 'grammy';
import {TelegramUserEditModel, TelegramUserViewModel} from "../../models/TelegramUserViewModel";
import {TelegramUserController} from "../../rest/TelegramUserController";

export const notification = async (
    ctx: Context,
    user: TelegramUserViewModel,
    statusStr: string,
): Promise<void> => {
    const editModel = new TelegramUserEditModel()
    editModel.telegramID = user.telegramID;
    editModel.organizationID = user.organizationID;

    if (statusStr) {
        editModel.notificationStatus = statusStr.toLowerCase() === 'true';
        user.notificationStatus = statusStr.toLowerCase() === 'true';
        await TelegramUserController.UpdateTelegramUser(editModel.telegramID, editModel);
    }
    await ctx.SendOrEditMessage(
        ctx.i18n.t('commands.notification.text', {
            user,
            warningText: ctx.i18n.t('commands.notification.warning'),
        }),
        {
            reply_markup: new InlineKeyboard()
                .text(
                    user.notificationStatus
                        ? ctx.i18n.t('commands.notification.disable')
                        : ctx.i18n.t('commands.notification.enable'),
                    '/notification ' + !user.notificationStatus,
                )
                .row()
                .text(ctx.i18n.t('commands.profile.button'), '/profile'),
        },
    );
};
