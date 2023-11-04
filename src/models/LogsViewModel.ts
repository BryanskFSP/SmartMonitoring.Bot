import {DataBaseViewModel} from "./DataBaseViewModel";
import {OrganizationViewModel} from "./OrganizationViewModel";
import {UUID} from "node:crypto";

export interface LogsViewModel {
    id: UUID;
    name: string;
    description: string;
    organizationID: UUID
    organization: OrganizationViewModel;
    dataBaseID: UUID;
    dataBase: DataBaseViewModel;
    action: number;
    logType: number;
    entity: string;
    entityID: string;
    entityJSON: string;
    fixStatus: boolean;
}
export interface LogsViewModelFull {
    telegramID: number;
    notificationStatus: boolean;
    metaInfo: string;
    createdAt: string;
    lastUseAt: string;
    organizationID: UUID;
}
export interface LogsViewModelStatus {
    status: boolean;
    name: string;
    data: string;
}
