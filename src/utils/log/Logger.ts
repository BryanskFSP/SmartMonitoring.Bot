/* eslint-disable @typescript-eslint/naming-convention */
import {Message} from '../message/Message';

const enum Colors {
    R_F = 31,
    G_F = 32,
    Y_F = 33,
    M_F = 35,
    C_F = 36,
    L_Red_F = 91,
    L_Green_F = 92,
    L_Yellow_F = 93,
    L_Magenta_F = 95,
    L_Cyan_F = 96,
}

const enum Fonts {
    RESET = 0,
    BOLD = 1,
    UNDERLINED = 4,
}

const enum Font {
    PREFIX = '\x1b[',
    POSTFIX = 'm',
}

const dateFormatOption: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    formatMatcher: 'best fit',
    localeMatcher: 'lookup',
    hour12: false,
};

const enum LOG_LEVEL {
    Debug,
    Info,
    Warning,
    Error,
    Fatal,
}

function genFont(font: number = Fonts.RESET): string {
    return `${Font.PREFIX}${font}${Font.POSTFIX}`;
}

export class Logger {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public static log(content?: string | unknown): void {
        // eslint-disable-next-line no-console
        console.log(content);
    }

    public Debug(content?: string | unknown): void {
        const logString = `${this.GenLogPrefix(LOG_LEVEL.Debug)}${genFont(
            Colors.L_Green_F,
        )}${content}${genFont()}`;
        Logger.log(logString);
    }

    public Info(content?: string | unknown): void {
        const logString = `${this.GenLogPrefix(LOG_LEVEL.Info)}${genFont(
            Colors.L_Cyan_F,
        )}${content}${genFont()}`;
        Logger.log(logString);
    }

    public Warning(content?: string | unknown): void {
        const logString = `${this.GenLogPrefix(LOG_LEVEL.Warning)}${genFont(
            Colors.L_Yellow_F,
        )}${content}${genFont()}`;
        Logger.log(logString);
    }

    public async Error(content?: string | unknown | Error, sendInLogChat?: boolean): Promise<void> {
        const logString = `${this.GenLogPrefix(LOG_LEVEL.Error)}${genFont(Colors.L_Red_F)}${genFont(
            Fonts.BOLD,
        )}${genFont(Fonts.UNDERLINED)}${content}${genFont()}`;
        Logger.log(logString);

        if (sendInLogChat && process.env.NODE_ENV !== 'development') {
            if (content instanceof Error) {
                    await Message.SendInLogChat(`${content.name}\n${content.message}`);
            } else await Message.SendInLogChat(`${content}`);
        }
    }

    public async Fatal(content?: string | unknown): Promise<void> {
        const logString = `${this.GenLogPrefix(LOG_LEVEL.Fatal)}${genFont(Colors.L_Magenta_F)}${genFont(
            Fonts.BOLD,
        )}${genFont(Fonts.UNDERLINED)}${content}${genFont()}`;
        Logger.log(logString);

        if (content instanceof Error) {
            await Message.SendInLogChat(`${content.name}\n${content.message}`);
        } else await Message.SendInLogChat(`${content}`);
    }

    private GenLogPrefix(logLevel: LOG_LEVEL): string {
        switch (logLevel) {
            case LOG_LEVEL.Debug:
                return (
                    `${genFont(Colors.G_F)}[ Debug ]${genFont()} ${genFont(
                        Colors.G_F,
                    )}[${new Date().toLocaleTimeString(undefined, dateFormatOption)}]` +
                    `${genFont()} ${genFont(Colors.G_F)}[${genFont(Fonts.UNDERLINED)}${
                        this.name
                    }${genFont()}]${genFont()} `
                );
            case LOG_LEVEL.Info:
                return (
                    `${genFont(Colors.C_F)}[ Info  ]${genFont()} ${genFont(
                        Colors.C_F,
                    )}[${new Date().toLocaleTimeString(undefined, dateFormatOption)}]` +
                    `${genFont()} ${genFont(Colors.C_F)}[${genFont(Fonts.UNDERLINED)}${
                        this.name
                    }${genFont()}]${genFont()} `
                );
            case LOG_LEVEL.Warning:
                return (
                    `${genFont(Colors.Y_F)}[Warning]${genFont()} ${genFont(
                        Colors.Y_F,
                    )}[${new Date().toLocaleTimeString(undefined, dateFormatOption)}]` +
                    `${genFont()} ${genFont(Colors.Y_F)}[${genFont(Fonts.UNDERLINED)}${
                        this.name
                    }${genFont()}]${genFont()} `
                );
            case LOG_LEVEL.Error:
                return (
                    `${genFont(Colors.R_F)}[ ERROR ]${genFont()} ${genFont(
                        Colors.R_F,
                    )}[${new Date().toLocaleTimeString(undefined, dateFormatOption)}]` +
                    `${genFont()} ${genFont(Colors.R_F)}[${genFont(Fonts.UNDERLINED)}${
                        this.name
                    }${genFont()}]${genFont()} `
                );
            case LOG_LEVEL.Fatal:
            default:
                return (
                    `${genFont(Colors.M_F)}[ FATAL ]${genFont()} ${genFont(
                        Colors.M_F,
                    )}[${new Date().toLocaleTimeString(undefined, dateFormatOption)}]` +
                    `${genFont()} ${genFont(Colors.M_F)}[${genFont(Fonts.UNDERLINED)}${
                        this.name
                    }${genFont()}]${genFont()} `
                );
        }
    }
}
