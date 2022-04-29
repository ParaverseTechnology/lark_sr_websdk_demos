export declare class Level {
    static INFO: string;
    static WARN: string;
    static ERR: string;
    static TRACE: string;
    static getLevelIndex(level: string): 0 | 2 | 1 | 3 | 4;
}
export interface LogObserver {
    onLog(msg: string): void;
}
/**
 *
 */
export default class Log {
    static get logLevel(): string;
    static set logLevel(level: string);
    static _logLevel: string;
    static info(...info: any[]): void;
    static warn(...warn: any[]): void;
    static err(...err: any[]): void;
    static trace(...log: any[]): void;
    static setObserver(ob: LogObserver): void;
    private static _observer;
    private static log;
}
