import {axiosInstance} from "./axiosInstance";
import {PSQLViewModel, PSQLViewModelMemory, PSQLViewModelTop} from "../models/PSQLViewModel";
import tools from "../utils/tools";

const { buildQueryParams } = tools();

export class PSQLController {
    public static async GetStates(): Promise<PSQLViewModel[]> {
        let res = await axiosInstance.get(`/api/PSQL`);
        return res.data as PSQLViewModel[];
    }
    public static async KillState(id?: string, pid?: string): Promise<void> {
        await axiosInstance.post(`/api/PSQL${buildQueryParams({ id, pid })}`);
    }
    public static async GetMemory(id?: string, memoryType?: string): Promise<PSQLViewModelMemory> {
        let res = await axiosInstance.get(`/api/PSQL/tables/memory${buildQueryParams({ id, memoryType })}`);
        return res.data as PSQLViewModelMemory;
    }
    public static async GetTableStates(id?: string): Promise<PSQLViewModelTop> {
        let res = await axiosInstance.get(`/api/PSQL/tables/top${buildQueryParams({ id })}`);
        return res.data as PSQLViewModelTop;
    }
    public static async CreateInfinityLoop(id: string): Promise<void> {
        await axiosInstance.post(`/api/PSQL/errors/create/infinityloop/${id}`);
    }
}
