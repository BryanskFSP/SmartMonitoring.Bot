import express, {Router} from "express";
import {UUID} from "node:crypto";
import {container} from "tsyringe";
import {BotClient} from "../client/client";
import {TelegramUserController} from "../rest/TelegramUserController";

export default function (context: Router) {
    const router = express.Router();
    const bot = container.resolve(BotClient);
    const telegramUserController = container.resolve(TelegramUserController);

    router.post('/:orgId/message/send', async (req, res) => {
        const text = req.query.text as string;
        const orgId = req.params.orgId as UUID

        if (!text || !orgId)
            return res.json({
                success: false,
                message: 'We need text in params!',
            }).status(400);

        const users = (await telegramUserController.GetTelegramUsers()).filter(x => x.notificationStatus == true && x.organizationID == orgId);
        if (users.length === 0)
            return res.json({
                success: false,
                message: 'No find users with notifications turned on',
            }).status(404);

        for (const user of users) {
            await bot.api.sendMessage(user.telegramID, text);
        }

        res.json({
            success: true,
            message: `Message sending in ${users.length} peoples`,
        }).status(200);
    });

    context.use('/org', router);
}
