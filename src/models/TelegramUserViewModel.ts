import {UUID} from "node:crypto";

export interface TelegramUserViewModel {
    telegramID: number;
    organizationID: UUID;
    notificationStatus: boolean;
    metaInfo?: MetaInfoViewModel;
}
export interface TelegramUserSession {
    datID: number | null;
    datName: string | null;
    pid: number;
    leaderPID: number | null;
    useSysID: number | null;
    usename: string | null;
    applicationName: string | null;
    clientAddr: string | null;
    clientHostname: string | null;
    clientPort: number | null;
    backendStart: string;
    wait_event_type: string | null;
    wait_event: string | null;
    state: string | null;
    query_id: string | null;
    query: string | null;
    backend_type: string | null;
}

export class TelegramUserEditModel {
    telegramID!: number;
    organizationID!: UUID;
    notificationStatus: boolean = true;
    metaInfo?: string;
}

export interface MetaInfoViewModel {
    first_name: string;
    username: string;
    language_code: string;
}
