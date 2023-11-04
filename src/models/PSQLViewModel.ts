interface PSQLViewModelMemoryData {
    total: string;
    used: string;
    avail: string;
    useProcent: string;
    type: number;
}
interface PSQLViewModelTopData {
    name: string;
    operationsCount: number;
}
interface PSQLViewModelStatus<T extends { [name: string]: any }> {
    status: boolean;
    name: string;
    data: T;
}

export interface PSQLViewModel {
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

export interface PSQLViewModelMemory extends PSQLViewModelStatus<PSQLViewModelMemoryData> {}
export interface PSQLViewModelTop extends PSQLViewModelStatus<PSQLViewModelTopData[]> {}
