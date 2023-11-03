import { Context } from '../../utils/types';
import { InlineKeyboard } from 'grammy';

export const credits = async (ctx: Context): Promise<void> => {
  await ctx.SendOrEditMessage(ctx.i18n.t('texts.credits'), {
    reply_markup: new InlineKeyboard().text(ctx.i18n.t('buttons.start'), '/start'),
  });
};
