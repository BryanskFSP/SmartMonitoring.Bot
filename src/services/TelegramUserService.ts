import {TelegramUserEditModel, TelegramUserViewModel} from "../models/TelegramUserViewModel";
import {TelegramUserController} from "../rest/TelegramUserController";
import {Context} from "../utils/types";


export class TelegramUserService {
    static async getOrCreateUser(ctx: Context): Promise<TelegramUserViewModel | undefined> {
        try {
            const id = ctx.data.User.id;
            let user: TelegramUserViewModel | null = null;
            try {
                user = await TelegramUserController.GetTelegramUserFull(id);
            } catch (e) {
                console.log(e)
            }

            if (user) return user;
            console.log("User not found, try create it...")
            const editModel = new TelegramUserEditModel();
            editModel.telegramID = id;
            editModel.metaInfo = JSON.stringify(ctx.data.User);
            editModel.notificationStatus = true;
            editModel.organizationID = 'ec654793-2226-4e80-a1b9-8781fce1878a';
            return await TelegramUserController.CreateTelegramUser(editModel);
        }
        catch (e){
            return undefined;
        }
    }
}
