import {container} from "tsyringe";
import {TelegramUserController} from "./TelegramUserController";

export const createControllers = () => {
    container.register(TelegramUserController, {useValue: new TelegramUserController()});
}