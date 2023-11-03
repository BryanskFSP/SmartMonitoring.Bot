/*
 * Copyright (c) 2023.
 * Nikita Shidlovsky (nlk81).
 */

import { Context } from '../../utils/types';
import { InlineKeyboard } from 'grammy';
import {TelegramUserViewModel} from "../../models/TelegramUserViewModel";

export const profile = async (ctx: Context, user: TelegramUserViewModel): Promise<void> => {
  const keyboard = new InlineKeyboard();
  keyboard
    .row()
    .text(
      user.notificationStatus
        ? ctx.i18n.t('commands.notification.disable')
        : ctx.i18n.t('commands.notification.enable'),
      '/notification ' + !user.notificationStatus,
    );

  keyboard.row().text(ctx.i18n.t('buttons.start'), '/start');

  await ctx.SendOrEditMessage(
    ctx.i18n.t('commands.profile.text', {
      user,
      warningText: ctx.i18n.t('commands.notification.warning'),
    }),
    {
      reply_markup: keyboard,
    },
  );
};
