import { SessionFlavor } from 'grammy';

import { UsersEntity } from '../database/entities/Users.entity';
import { MyContextClass, SessionData } from './context';
import { I18nContextFlavor } from '@grammyjs/i18n';

type SessionDataField = 'command' | 'info' | 'message' | 'groupID';

type Context = MyContextClass & SessionFlavor<SessionData> & I18nContextFlavor;

export type Command<T = boolean> = {
  name: string;
  description: string;
  viewInMenu: boolean | false;
  database: T;
  aliases: string[];
  params: string[];
  allowedChats?: number[];
  allowedUsers?: number[];
  allowedChatType?: string[];
  execute(message: Context, user: T extends true ? UsersEntity : null, ...args: any): Promise<void>;
};

export type QiwiPayFields = {
  amount: number;
  currency: 'RUB';
  comment: string;
  expirationDateTime: string;
  billId: string;
  account: string | number;
};
