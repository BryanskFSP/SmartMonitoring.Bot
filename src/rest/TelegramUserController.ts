import {axiosInstance} from "./axiosInstance";
import {TelegramUserEditModel, TelegramUserSession, TelegramUserViewModel} from "../models/TelegramUserViewModel";

export class TelegramUserController {
    private collection: TelegramUserViewModel[] = [];
    private collectionHash: string;

    public async GetTelegramUsers(): Promise<TelegramUserViewModel[]> {
        const hash = await this.GetTelegramUsersHash();
        if (hash === this.collectionHash)
            return this.collection;
        let res = await axiosInstance.get("/api/TelegramUser")
        const data = res.data as TelegramUserViewModel[];
        this.collectionHash = hash;
        this.collection = data;
        return data;
    }

    public async GetTelegramUsersHash(): Promise<string> {
        let res = await axiosInstance.get("/api/TelegramUser/hash")
        const data = res.data as string;
        return data;
    }

    public static async GetTelegramUsersFull(): Promise<TelegramUserViewModel[]> {
        let res = await axiosInstance.get("/api/TelegramUser/full")
        const data = res.data as TelegramUserViewModel[];
        return data;
    }

    public static async GetTelegramUser(id: number): Promise<TelegramUserViewModel> {
        let res = await axiosInstance.get(`/api/TelegramUser/${id.toString()}`)
        const data = res.data as TelegramUserViewModel;
        return data;
    }

    public static async GetTelegramUserFull(id: number): Promise<TelegramUserViewModel> {
        let res = await axiosInstance.get(`/api/TelegramUser/${id.toString()}/full`)
        const data = res.data as TelegramUserViewModel;
        return data;
    }

    public static async UpdateTelegramUser(id: number, editModel: TelegramUserEditModel): Promise<TelegramUserViewModel> {
        let res = await axiosInstance.put(`/api/TelegramUser/${id.toString()}`, editModel)
        const data = res.data as TelegramUserViewModel;
        return data;
    }

    public static async CreateTelegramUser(editModel: TelegramUserEditModel): Promise<TelegramUserViewModel> {
        let res = await axiosInstance.post(`/api/TelegramUser`, editModel)
        const data = res.data as TelegramUserViewModel;
        return data;
    }
}
