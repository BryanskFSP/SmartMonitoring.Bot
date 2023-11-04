import {axiosInstance} from "./axiosInstance";
import {DataBaseViewModel, DataBaseViewModelCreate, DataBaseViewModelUpdate} from "../models/DataBaseViewModel";

export class DatabaseController {
    public static async GetAll(): Promise<DataBaseViewModel[]> {
        let res = await axiosInstance.get(`/api/DataBase`);
        return res.data as DataBaseViewModel[];
    }
    public static async CreateDataBase(createData: DataBaseViewModelCreate): Promise<DataBaseViewModel> {
        let res = await axiosInstance.post(`/api/DataBase`, createData);
        return res.data as DataBaseViewModel;
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
}
