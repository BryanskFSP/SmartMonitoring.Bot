import express, {Router} from "express";
import {container} from "tsyringe";
import {BotClient} from "../client/client";
import {TelegramUserController} from "../rest/TelegramUserController";
import {UUID} from "node:crypto";
import {InlineKeyboard} from "grammy";
import {I18n} from "@grammyjs/i18n";
import {LogsController} from "../rest/LogsController";

export default function (context: Router) {
    const router = express.Router();
    const bot = container.resolve(BotClient);
    const i18n = container.resolve(I18n);
    const telegramUserController = container.resolve(TelegramUserController);

    router.post('/send', async (req, res) => {
        const text = req.query.text as string;
        if (!text)
            return res.json({
                success: false,
                message: 'We need text in params!',
            }).status(400);

        const users = (await telegramUserController.GetTelegramUsers()).filter(x => x.notificationStatus == true);
        if (!users)
            return res.json({
                success: false,
                message: 'No find users with notifications turned on',
            }).status(404);

        for (const user of users) {
            await bot.api.sendMessage(user.telegramID, text);
        }

        res.json({
            success: true,
            message: `Message sending in ${users.length} users`,
            count: users.length,
        }).status(200);
    });
    router.post('/:userId/message/send', async (req, res) => {
        const text = req.query.text as string;
        const logId = req.query.logId as UUID;
        const userId = req.params.userId as string

        if (!text || !userId)
            return res.json({
                success: false,
                message: 'We need more params!',
            }).status(400);

        const keyboard = new InlineKeyboard();


        const log = await LogsController.GetById(logId)

        keyboard.row().text(i18n.t('ru', 'buttons.skip'), '/start');
        if (logId)
            keyboard.row().text(i18n.t('ru', 'buttons.fix'), `/logfix ${logId}:context`);

        keyboard.row().url(i18n.t('ru', 'buttons.sandbox.text'), i18n.t('ru', 'buttons.sandbox.url'));

        await bot.api.sendMessage(userId, text, {reply_markup: keyboard});

        res.json({
            success: true,
            message: "Message sending",
        }).status(200);
    })

    context.use('/users', router);
}
