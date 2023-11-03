import {Command, Context} from '../utils/types';
import {container} from 'tsyringe';
import {BotClient} from '../client/client';
import {InlineKeyboard} from 'grammy';
import _ from 'lodash';
import {Logger} from '../utils/log/Logger';
import {SessionDataType} from '../utils/context';
import {TelegramUserService} from "../services/TelegramUserService";

const bot = container.resolve(BotClient);
const logger = container.resolve(Logger);
export const commandHandler = async (ctx: Context): Promise<void> => {
    if (!ctx.data.Message || !ctx.data.User || !ctx.data.ChatID) return;
    let [commandName, ...args] = ctx.data.Message.split(/\s+/g);
    let command;

    if (commandName === '/start' && args.length !== 0) {
        args = args[0].replace('_', ' ').split(' ');
        args[0] = '/' + args[0];
        commandName = args[0].split(' ')[0];
        args = args.slice(1);
        command = bot.FindCommand(commandName.toLowerCase());
    } else command = bot.FindCommand(commandName.toLowerCase());

    if (!command && ctx.session.length('command') != 0) {
        const session = (await ctx.session.getData('command')) as SessionDataType;
        [commandName, ...args] = session.value.split(/\s+/g);
        command = bot.FindCommand(commandName.toLowerCase());
        const [...messageArgs] = ctx.data.Message.split(/\s+/g);
        args = args.concat(messageArgs);
    }

    if (!command && ctx.data.ChatType !== 'private') return;
    if (!command)
        return void (await ctx.SendOrEditMessage(ctx.i18n.t('commands.notFound'), {
            reply_markup: new InlineKeyboard().text(ctx.i18n.t('buttons.start'), `/start`),
        }));

    const passedTests =
        (await isAllowedToUser(ctx, command)) &&
        (await isAllowedToChatType(ctx, command)) &&
        (await isAllowedToChat(ctx, command));
    if (!passedTests) return;

    let user: any;

    if (command.database) {
        user = await TelegramUserService.getOrCreateUser(ctx);
    } else user = null;
    try {
        if (command)
        await command.execute(ctx, user, ...args);
    } catch (e) {
        if (e instanceof Error) {
            await ctx.SendOrEditMessage(ctx.i18n.t('texts.error'), {
                reply_markup: new InlineKeyboard().text(ctx.i18n.t('buttons.start'), `/start`),
            });
            await logger.Error(e);
        } else
            await ctx.SendOrEditMessage(e, {
                reply_markup: new InlineKeyboard().text(ctx.i18n.t('buttons.start'), `/start`),
            });
    }
};

const isAllowedToChatType = async (ctx: Context, command: Command): Promise<boolean> => {
    if (_.isEmpty(command.allowedChatType)) return ctx.data.ChatType === 'private';
    return command.allowedChatType!.some((chatType) => chatType === ctx.data.ChatType);
};

const isAllowedToUser = async (ctx: Context, command: Command): Promise<boolean> => {
    if (_.isEmpty(command.allowedUsers)) return true;

    return command.allowedUsers!.some((userID) => userID === ctx.data.User.id);
};

const isAllowedToChat = async (ctx: Context, command: Command): Promise<boolean> => {
    if (_.isEmpty(command.allowedChats)) return true;

    return command.allowedChats!.some((chatID) => chatID === ctx.data.ChatID);
};
