import {Command} from '../../utils/types';
import {container} from 'tsyringe';
import {BotClient} from '../../client/client';
import {logs} from "./logs";
import {logsDetail} from "./logsDetail";
import {logFix} from "./logFix";

export const UserCommands: Command[] = [
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
