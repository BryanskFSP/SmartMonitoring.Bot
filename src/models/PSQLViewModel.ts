interface PSQLViewModelData {
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
interface PSQLViewModelMemoryData {
    total: string;
    used: string;
    avail: string;
    type: number;
}
interface PSQLViewModelTopData {
    name: string;
    operationsCount: number;
}
interface PSQLViewModelBlockedProcessData {
    lockedItem: string;
    warningDuration: number;
    blockedPID: number;
    blockedQuery: string;
    blockedMode: string;
}
interface PSQLViewModelStatsIndexData {
    relName: string;
    seqScan: number;
    idxScan: number;
    indexStat: number;
}
interface PSQLViewModelStatsOldIndexData {
    indexrelname: string;
    relname: string;
    stats: number;
}


interface PSQLViewModelStatus<T extends any> {
    status: boolean;
    name: string;
    data: T;
}

export interface PSQLViewModel extends PSQLViewModelStatus<PSQLViewModelData[]> {}
export interface PSQLViewModelMemory extends PSQLViewModelStatus<PSQLViewModelMemoryData> {}
export interface PSQLViewModelTop extends PSQLViewModelStatus<PSQLViewModelTopData[]> {}
export interface PSQLViewModelCachingRatio extends PSQLViewModelStatus<number> {}
export interface PSQLViewModelCachingIndexesRatio extends PSQLViewModelStatus<number> {}

export interface PSQLViewModelWasted extends PSQLViewModelStatus<number> {}
export interface PSQLViewModelBlockedProcesses extends PSQLViewModelStatus<PSQLViewModelBlockedProcessData[]> {}
export interface PSQLViewModelStatsIndexes extends PSQLViewModelStatus<PSQLViewModelStatsIndexData[]> {}
export interface PSQLViewModelStatsOldIndexes extends PSQLViewModelStatus<PSQLViewModelStatsOldIndexData[]> {}
