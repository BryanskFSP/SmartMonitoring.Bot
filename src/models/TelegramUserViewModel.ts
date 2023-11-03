import {UUID} from "node:crypto";

export interface TelegramUserViewModel {
    telegramID: number;
    orgId: UUID;
    notificationStatus: boolean;
    metaInfo?: MetaInfoViewModel;
}

export class TelegramUserEditModel {
    telegramID!: number;
    orgId!: UUID;
    notificationStatus: boolean = true;
    metaInfo?: string;
}

export interface MetaInfoViewModel {
    first_name: string;
    username: string;
    language_code: string;
}
