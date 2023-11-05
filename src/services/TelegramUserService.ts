import {TelegramUserEditModel, TelegramUserViewModel} from "../models/TelegramUserViewModel";
import {TelegramUserController} from "../rest/TelegramUserController";
import {Context} from "../utils/types";


export class TelegramUserService {
    static async CreateUser(ctx: Context, inviteCode: string): Promise<TelegramUserViewModel | undefined> {
        try {
            const id = ctx.data.User.id;
            console.log("User not found, try create it...")
            const editModel = new TelegramUserEditModel();
            editModel.telegramID = id;
            editModel.metaInfo = JSON.stringify(ctx.data.User);
            editModel.notificationStatus = true;
            editModel.organizationID = 'ec654793-2226-4e80-a1b9-8781fce1878a';
            return await TelegramUserController.CreateTelegramUser(editModel, inviteCode);
        } catch (e) {
            return undefined;
        }
    }
    static async getUser(ctx: Context): Promise<TelegramUserViewModel | undefined> {
        try {
            const id = ctx.data.User.id;
            return await TelegramUserController.GetTelegramUserFull(id);
        } catch (e){
            return undefined;
        }
    }
}
