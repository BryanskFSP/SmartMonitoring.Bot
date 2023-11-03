import { Update, User, UserFromGetMe } from '@grammyjs/types';
import { Api, Context } from 'grammy';
import { SessionDataField } from '../types';
import { Other } from 'grammy/out/core/api';

class MyContextData {
    Message: string | undefined;
    Type: 'message' | 'callback_query';
    ChatID: number | undefined;
    User: User;
    ChatType: 'channel' | 'private' | 'group' | 'supergroup';
}

export class MyContextClass extends Context {
    public data: MyContextData;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
        super(update, api, me);
        this.SetData();
    }

    private SetData = async (): Promise<void> => {
        this.data = new MyContextData();
        if (this.update.message && this.update.message.from) {
            this.data.Message = this.update.message.text!;
            this.data.ChatID = this.update.message.chat.id!;
            this.data.User = this.update.message.from;
            this.data.Type = 'message';
            this.data.ChatType = this.update.message.chat.type;
        } else if (this.update.callback_query && this.update.callback_query.message) {
            this.data.Message = this.update.callback_query.data;
            this.data.ChatID = this.update.callback_query.message.chat.id;
            this.data.User = this.update.callback_query.from;
            this.data.Type = 'callback_query';
            this.data.ChatType = this.update.callback_query.message.chat.type;
        }
    };

    public SendOrEditMessage = async (
        text: string,
        other?: Other<any, any> | undefined,
        signal?: AbortSignal | undefined,
    ): Promise<void> => {
        const isCommandMessage = this.data.Type === 'message';

        if (isCommandMessage) await this.reply(text, other);
        else await this.editMessageText(text, other);
    };
}

export type SessionDataType = {
    data: SessionDataField;
    value: any;
};

export class SessionData {
    private data: SessionDataType[] = [];

    constructor() {
        this.data = [];
    }

    public async setData(data: SessionDataField, value: any): Promise<void> {
        this.data.push({ data, value });
    }

    public async getDataArray(data: SessionDataField): Promise<SessionDataType[]> {
        return this.data.filter((session) => session.data === data);
    }

    public async getData(dataField: SessionDataField): Promise<SessionDataType | null> {
        const data = this.data.find((session) => session.data === dataField);
        if (data == undefined) return null;
        else return data;
    }

    public async addData(data: SessionDataField, value: any): Promise<SessionDataType> {
        const session = this.data.find((session) => session.data === data);
        if (session) session.value = value;
        else this.data.push({ data, value });
        return this.data.find((session) => session.data === data)!;
    }

    public async deleteData(data: SessionDataField): Promise<void> {
        this.data = this.data.filter((session) => session.data !== data);
    }

    public length(data?: SessionDataField): number {
        if (data) return this.data.filter((session) => session.data === data).length;
        return this.data.length;
    }
}
