import {axiosInstance} from "./axiosInstance";
import {
    PSQLViewModel, PSQLViewModelBlockedProcesses,
    PSQLViewModelCachingIndexesRatio,
    PSQLViewModelCachingRatio,
    PSQLViewModelMemory, PSQLViewModelStatsIndexes, PSQLViewModelStatsOldIndexes,
    PSQLViewModelTop, PSQLViewModelWasted
} from "../models/PSQLViewModel";
import tools from "../utils/tools";

const { buildQueryParams } = tools();

export class PSQLController {
    public static async GetStates(dbID: string): Promise<PSQLViewModel> {
        let res = await axiosInstance.get(`/api/PSQL${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModel;
    }
    public static async GetTablesMemory(dbID: string, memoryType?: string): Promise<PSQLViewModelMemory> {
        let res = await axiosInstance.get(`/api/PSQL/tables/memory${buildQueryParams({ dbID, memoryType })}`);
        return res.data as PSQLViewModelMemory;
    }
    public static async GetTablesTop(dbID: string): Promise<PSQLViewModelTop> {
        let res = await axiosInstance.get(`/api/PSQL/tables/top${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelTop;
    }
    public static async GetTablesCachingRatio(dbID: string): Promise<PSQLViewModelCachingRatio> {
        let res = await axiosInstance.get(`/api/PSQL/tables/cachingratio${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelCachingRatio;
    }
    public static async GetTablesCachingIndexesRatio(dbID: string): Promise<PSQLViewModelCachingIndexesRatio> {
        let res = await axiosInstance.get(`/api/PSQL/tables/cachingindexesratio${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelCachingIndexesRatio;
    }

    public static async KillState(dbID: string, pid?: string): Promise<void> {
        await axiosInstance.post(`/api/PSQL${buildQueryParams({ dbID, pid })}`);
    }
    public static async CreateInfinityLoop(dbID: string): Promise<void> {
        await axiosInstance.post(`/api/PSQL/errors/create/infinityloop/${dbID}`);
    }
    public static async ClearSpace(dbID: string): Promise<void> {
        await axiosInstance.post(`/api/PSQL/space/clear${buildQueryParams({ dbID })}`);
    }
    public static async ClearSpaceVacuum(dbID: string): Promise<void> {
        await axiosInstance.post(`/api/PSQL/space/clear/vacuum${buildQueryParams({ dbID })}`);
    }
    public static async GetBlockedProcesses(dbID: string): Promise<PSQLViewModelBlockedProcesses> {
        const res = await axiosInstance.post(`/api/PSQL/processes/locked${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelBlockedProcesses
    }
    public static async GetIndexesStats(dbID: string): Promise<PSQLViewModelStatsIndexes> {
        const res = await axiosInstance.post(`/api/PSQL/stats/indexes${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelStatsIndexes;
    }
    public static async GetOutdatedIndexesStats(dbID: string): Promise<PSQLViewModelStatsOldIndexes> {
        const res = await axiosInstance.post(`/api/PSQL/stats/indexes/outdated${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelStatsOldIndexes;
    }
    public static async GetWastedBytes(dbID: string): Promise<PSQLViewModelWasted> {
        const res = await axiosInstance.post(`/api/PSQL/wasted${buildQueryParams({ dbID })}`);
        return res.data as PSQLViewModelWasted;
    }
}
