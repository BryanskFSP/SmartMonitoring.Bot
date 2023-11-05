import {Command} from "../../utils/types";
import {container} from "tsyringe";
import {BotClient} from "../../client/client";
import {db} from "./db";
import {dbDetail} from "./dbDetail";
import {dbState} from "./dbState";
import {dbStates} from "./dbStates";
import {dbRepair} from "./dbRepair";
import {dbStatuses} from "./dbStatuses";
import {dbStatus} from "./dbStatus";
import {dbActions} from "./dbActions";
import {dbAction} from "./dbAction";

export const UserCommands: Command[] = [
    {
        name: '/db',
        description: 'Базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['базы данных'],
        execute: db,
    },
    {
        name: '/dbdetail',
        description: 'База данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['база данных'],
        execute: dbDetail,
    },
    {
        name: '/dbstate',
        description: 'Статус базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['сбд'],
        execute: dbState,
    },
    {
        name: '/dbstates',
        description: 'Проверка статусов базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['псбд'],
        execute: dbStates,
    },
    {
        name: '/dbrepair',
        description: 'Восстановление базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['вбд'],
        execute: dbRepair,
    },
    {
        name: '/dbstatuses',
        description: 'Стутусы базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['сыбд'],
        execute: dbStatuses,
    },
    {
        name: '/dbstatus',
        description: 'Статус базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['сбд'],
        execute: dbStatus,
    },
    {
        name: '/dbactions',
        description: 'Действия с базой данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['дсбд'],
        execute: dbActions,
    },
    {
        name: '/dbaction',
        description: 'Статус базы данных',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['сбд'],
        execute: dbAction,
    },
];

const bot = container.resolve(BotClient);
bot.RegisterCommand(UserCommands);
