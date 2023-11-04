import {UUID} from "node:crypto";

export interface DataBaseViewModel {
    id: UUID;
    name: string;
    database: string;
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
