import {Command} from '../../utils/types';
import {start} from './start';
import {container} from 'tsyringe';
import {BotClient} from '../../client/client';
import {profile} from "./profile";
import {credits} from "./credits";
import {notification} from "./notification";
import {services} from "./services";

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
        name: '/services',
        description: 'Сервисы',
        database: true,
        params: [],
        viewInMenu: true,
        aliases: ['профиль'],
        execute: services,
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
    }
];

const bot = container.resolve(BotClient);
bot.RegisterCommand(UserCommands);
