import {TelegramUserSession} from "../models/TelegramUserViewModel";
import {axiosInstance} from "./axiosInstance";

export class PSQLController {
    public static async GetServices(): Promise<TelegramUserSession[]> {
        let res = await axiosInstance.get(`/api/PSQL`);
        const data = res.data as TelegramUserSession[];
        return data;
    }
}
