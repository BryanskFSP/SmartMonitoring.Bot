import {Command} from '../../utils/types';
import {start} from './start';
import {container} from 'tsyringe';
import {BotClient} from '../../client/client';
import {profile} from "./profile";
import {credits} from "./credits";
import {notification} from "./notification";
import {logs} from "./logs";
import {logsDetail} from "./logsDetail";
import {logFix} from "./logFix";

export const UserCommands: Command[] = [
    {
        name: '/start',
        description: 'Приветствующее сообщение',
        database: true,
        params: [],
        viewInMenu: false,
        aliases: ['старт'],
        execute: start,
    },
    {
        name: '/profile',
        description: 'Профиль',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['назад'],
        execute: profile,
    },
    {
        name: '/logs',
        description: 'Логи',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['логи'],
        execute: logs,
    },
    {
        name: '/logsdetail',
        description: 'Лог по бд',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['лог по бд'],
        execute: logsDetail,
    },
    {
        name: '/credits',
        description: 'О разработчике',
        database: false,
        params: [],
        viewInMenu: true,
        aliases: ['разработчик', 'бот'],
        execute: credits,
    },
    {
        name: '/notification',
        description: 'Уведомления',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['уведомления'],
        execute: notification,
    },
    {
        name: '/logfix',
        description: 'Fix log',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['log id'],
        execute: logFix,
    }
];

const bot = container.resolve(BotClient);
bot.RegisterCommand(UserCommands);
