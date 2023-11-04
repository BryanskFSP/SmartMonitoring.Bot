import {axiosInstance} from "./axiosInstance";
import {LogsViewModel, LogsViewModelFull, LogsViewModelStatus} from "../models/LogsViewModel";

export class LogsController {
    public static async GetAll(): Promise<LogsViewModel[]> {
        let res = await axiosInstance.get(`/api/Log`);
        return res.data as LogsViewModel[];
    }
    public static async GetFull(): Promise<LogsViewModelFull[]> {
        let res = await axiosInstance.get(`/api/Log/full`);
        return res.data as LogsViewModelFull[];
    }
    public static async GetDBById(id: string): Promise<LogsViewModel[]> {
        let res = await axiosInstance.get(`/api/Log/db/${id}`);
        return res.data as LogsViewModel[];
    }
    public static async PostById(id: string): Promise<LogsViewModelStatus> {
        let res = await axiosInstance.post(`/api/Log/${id}`);
        return res.data as LogsViewModelStatus;
    }
    public static async GetById(id: string): Promise<LogsViewModel> {
        let res = await axiosInstance.get(`/api/Log/${id}`);
        return res.data as LogsViewModel;
    }
}
