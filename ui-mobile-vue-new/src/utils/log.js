export class Level {
    static INFO  = 'INFO';
    static WARN  = 'WARN';
    static ERR   = 'ERROR';
    static TRACE = 'TRACE';
}

/* export interface LogObserver {
    onLog(msg: string): void;
} */

/**
 * 
 */

export default class Log {
    static info(...info) {
        this.log(Level.INFO, ...info);
    }
    static warn(...warn) {
        this.log(Level.WARN, ...warn);
    }
    static err(...err) {
        this.log(Level.ERR, ...err);
    }
    static trace(...log) {
        this.log(Level.TRACE, ...log);
    }

    static setObserver(ob/*: LogObserver*/) {
        this._observer = ob;
    }
    static _observer/*: LogObserver | null*/ = null;

    static log(level/*: Level*/, ...logs/*: any[]*/)/*: void*/ {
        const d = new Date;
        const prex = d.toLocaleTimeString() + ' [' + level + ']:';
        // jQuery('#log').append('<p>' + logs.toString() + '</p>');
        switch (level) {
            case Level.INFO:
                if (process.env.NODE_ENV === 'development') {
                    console.info(...logs);
                }
                break;
            case Level.WARN:
                console.warn(...logs);
                break;
            case Level.ERR:
                console.error(...logs);
                break;
            case Level.TRACE:
                console.trace(...logs);
                break;
            default:
                break;
        }

        if (this._observer) {
            this._observer.onLog(prex + logs.toString());
        }
    }
}