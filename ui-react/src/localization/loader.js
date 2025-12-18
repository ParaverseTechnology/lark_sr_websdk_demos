import { 
    SupportLanguage, 
    getSupportLanguageFromCodeStr
}                                   from './language';

import Message                      from './message';
import GestureIns                   from './gesture_ins';
import UI                           from './ui';
import EnMessage from '../assets/localization/en/message.json'
import EnGestureIns from '../assets/localization/en/gestureIns.json'
import EnUi from '../assets/localization/en/ui.json'
import CnMessage from '../assets/localization/zh/message.json'
import CnGestureIns from '../assets/localization/zh/gestureIns.json'
import CnUi from '../assets/localization/zh/ui.json'


const enRes = {
    message: EnMessage,
    gestureIns: EnGestureIns,
    ui: EnUi
};

const cnRes = {
    message: CnMessage,
    gestureIns: CnGestureIns,
    ui: CnUi
};


export default class LocalizationLoader {
    static getPrePath() {
        const prexEn = '../assets/localization/en/';
        const prexCn = '../assets/localization/zh/';
        switch (this.mLanguageCode) {
            case SupportLanguage.CN:
            return prexCn;
            case SupportLanguage.EN:
            return prexEn;
            default:
            return prexCn;
        }
    }
    static init(code) {
        this.mLanguageCode = getSupportLanguageFromCodeStr(code);
        if (this.mLanguageCode === SupportLanguage.CN) {
            this.message.loadData(cnRes.message);
            this.gestureIns.loadData(cnRes.gestureIns);
            this.ui.loadData(cnRes.ui);
        } else {
            this.message.loadData(enRes.message);
            this.gestureIns.loadData(enRes.gestureIns);
            this.ui.loadData(enRes.ui);
        }
    }

    static get message() {
        return this.mMessage;
    }
    static get gestureIns() {
        return this.mGestureIns;
    }
    static get ui() {
        return this.mUI;
    }
}
// TODO lint
LocalizationLoader.mLanguageCode = SupportLanguage.CN;
LocalizationLoader.mMessage = new Message();
LocalizationLoader.mGestureIns = new GestureIns();
LocalizationLoader.mUI = new UI();

export const K2 = '';