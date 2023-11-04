import {axiosInstance} from "./axiosInstance";
import {
    DataBaseViewModel,
    DataBaseViewModelCreate,
    DataBaseViewModelStatus,
    DataBaseViewModelUpdate
} from "../models/DataBaseViewModel";

export class DatabaseController {
    public static async GetAll(): Promise<DataBaseViewModel[]> {
        let res = await axiosInstance.get(`/api/DataBase`);
        return res.data as DataBaseViewModel[];
    }
    public static async GetFull(): Promise<DataBaseViewModel[]> {
        let res = await axiosInstance.get(`/api/DataBase/full`);
        return res.data as DataBaseViewModel[];
    }
    public static async GetById(id: string): Promise<DataBaseViewModel> {
        let res = await axiosInstance.get(`/api/DataBase/${id}`);
        return res.data as DataBaseViewModel;
    }
    public static async UpdateById(id: string, editData: DataBaseViewModelUpdate): Promise<DataBaseViewModel> {
        let res = await axiosInstance.put(`/api/DataBase`, editData);
        return res.data as DataBaseViewModel;
    }
    public static async DeleteById(id: string): Promise<void> {
        await axiosInstance.delete(`/api/DataBase/${id}`);
    }


    public static async CreateDataBase(createData: DataBaseViewModelCreate): Promise<DataBaseViewModel> {
        let res = await axiosInstance.post(`/api/DataBase`, createData);
        return res.data as DataBaseViewModel;
    }
    public static async CheckFull(id: string): Promise<DataBaseViewModelStatus> {
        let res = await axiosInstance.post(`/api/DataBase/${id}/check/full`);
        return res.data as DataBaseViewModelStatus;
    }
    public static async CheckMemory(id: string): Promise<DataBaseViewModelStatus> {
        let res = await axiosInstance.post(`/api/DataBase/${id}/check/memory`);
        return res.data as DataBaseViewModelStatus;
    }
    public static async CheckStates(id: string): Promise<DataBaseViewModelStatus> {
        let res = await axiosInstance.post(`/api/DataBase/${id}/check/states`);
        return res.data as DataBaseViewModelStatus;
    }
    public static async CheckCachingRatio(id: string): Promise<DataBaseViewModelStatus> {
        let res = await axiosInstance.post(`/api/DataBase/${id}/check/cachingratio`);
        return res.data as DataBaseViewModelStatus;
    }
    public static async CheckCachingIndexesRatio(id: string): Promise<DataBaseViewModelStatus> {
        let res = await axiosInstance.post(`/api/DataBase/${id}/check/cachingindexesratio`);
        return res.data as DataBaseViewModelStatus;
    }
    public static async FixFull(id: string): Promise<DataBaseViewModelStatus> {
        let res = await axiosInstance.post(`/api/DataBase/${id}/fix/full`);
        return res.data as DataBaseViewModelStatus;
    }
}
