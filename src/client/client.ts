import { Bot } from 'grammy';
import { Command, Context } from '../utils/types';
import { getConfig } from '../config/config';
import { I18n, TemplateData } from '@grammyjs/i18n';
import {container} from "tsyringe";

export class BotClient extends Bot<Context> {
    private readonly commands: Command[];
    private i18n: I18n;

    public constructor(options, options2) {
        super(options, options2);
        this.commands = [];
        this.i18n = new I18n({
            defaultLanguageOnMissing: true,
            defaultLanguage: 'ru',
            directory: './src/locales',
            useSession: true,
        });
        this.use(this.i18n.middleware());
        container.register(I18n, {useValue: this.i18n})
    }

    public FindCommand(key: string): Command | undefined {
        const c = this.commands.find(
            (x) => x.name == key.toLocaleLowerCase() || x.aliases.includes(key.toLocaleLowerCase()),
        );

        return c === undefined ? undefined : c;
    }

    public RegisterCommand(commands: Command[]) {
        for (const command of commands) {
            this.commands.push(command);
        }

        this.api
            .setMyCommands(
                this.commands
                    .filter((command) => command.viewInMenu)
                    .map((command) => {
                        const aliases = '\nАлиасы: ' + command.aliases.join(', ');
                        return {
                            command: command.name,
                            description: command.description + (command.aliases.length != 0 ? aliases : ''),
                        };
                    }),
            )
            .then(() => this.SendInLogChat(`Registered commands: ${commands.length}`));
    }

    public async GedTextFromLocale(
        languageCode: string,
        key: string,
        templateData?: Readonly<TemplateData> | undefined,
    ): Promise<string> {
        return this.i18n.t(languageCode, key, templateData);
    }

    public async SendInLogChat(message: string): Promise<void> {
      if (process.env.NODE_ENV !== "development")
        await this.api.sendMessage(getConfig().chats.log, message);
    }

    public async CommandExecuted(memberID: string, commandName: string): Promise<void> {
        await this.SendInLogChat(`${memberID} executed command ${commandName}`);
    }
}
