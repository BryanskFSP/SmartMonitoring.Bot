import {UUID} from "node:crypto";

export interface DataBaseViewModelStatus {
    status: boolean;
    name: string;
    data: string;
}

export interface DataBaseViewModel {
    id: UUID;
    name: string;
    host: string;
    database: string;
    user: string;
    description: string;
    organizationID: UUID;
}

export class DataBaseViewModelCreate {
    name: string;
    description: string;
    host: string;
    user: string;
    database: string;
    password: string;
    organizationID: UUID;
}
export class DataBaseViewModelUpdate extends DataBaseViewModelCreate {}
