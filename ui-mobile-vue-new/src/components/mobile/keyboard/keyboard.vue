<template>
    <div 
        v-if="letterKeyboard"
        class="keyboard"
    >
    <!-- letter row 1 -->
        <div class="row">
            <!-- tab -->
            <Key size="x1" keyName="Tab" 
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-left">
                    Tab
                </div>
            </Key>
            <!-- tab end -->
            <!-- q -> p -->
            <Key
                v-for="(key, keyIndex) in LetterKeyMap[0]" :key="keyIndex"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
                :keyName="key.key"
            >
                <span v-if="showUpCase">
                    {{key.title.toUpperCase()}}
                </span>
                <span v-else>
                    {{key.title.toLowerCase()}}
                </span>
            </Key>
            <!-- q->p end -->
            <!-- backspace <- -->
            <Key size="x1" keyName="Backspace" 
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat">
                <div class="key-align-right">
                    <img class="icon-delete" src="@/assets/img/mobile/key_delete.png" alt="">
                </div>
            </Key>
            <!-- backspace end -->
        </div>
        <!-- letter row 2 -->
        <div class="row">
            <!-- capslock -->
            <Key size="x1" v-on:start="onKeyStart" v-on:repeat="onRepeat" v-on:end="onCapsLock" keyName="CapsLock">
                <div class="key-align-left">
                    <div :class="capsLockClass"></div>
                    Caps
                </div>               
            </Key>
            <!-- capslock end -->
            <!-- a->l -->
            <Key 
                v-for="(key, keyIndex) in LetterKeyMap[1]" :key="keyIndex"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
                :keyName="key.key"
            >
                <span v-if="showUpCase">
                    {{key.title.toUpperCase()}}
                </span>
                <span v-else>
                    {{key.title.toLowerCase()}}
                </span>
            </Key>
            <!-- a->l end -->
            <!-- enter -->
            <Key size="x2" keyName="Enter" 
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-right">
                    <img class="icon-enter" src="@/assets/img/mobile/key_enter.png" alt="">
                </div>
            </Key>
            <!-- enter end -->
        </div>
        <!-- letter row 3 -->
        <div class="row">
            <!-- shift left -->
            <Key size="x2" v-on:start="shiftStart" v-on:end="shiftEnd" v-on:longPress="longPressShift" v-on:repeat="onRepeat"
                keyName="ShiftLeft"
            >
                <div class="key-align-left">
                    <div :class="leftShiftLockClass"></div>
                    <img class="icon-shift" src="@/assets/img/mobile/key_shift.png" alt="">
                </div>
            </Key>
            <!-- shiftleft end -->
            <!-- z-m -->
            <Key 
                v-for="(key, keyIndex) in LetterKeyMap[2]" :key="keyIndex"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
                :keyName="key.key"
            >
                <span v-if="showUpCase">
                    {{key.title.toUpperCase()}}
                </span>
                <span v-else>
                    {{key.title.toLowerCase()}}
                </span>
            </Key>
            <!-- z-m end -->
            <Key size="x1" keyName="Period"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div v-if="!shift">
                    <span>.</span>
                    <span class="upTag">></span>
                </div>
                <div v-else>
                    <span>></span>
                    <span class="upTag">.</span>
                </div>
            </Key>
            <Key size="x2" v-on:start="shiftStart" v-on:end="shiftEnd" v-on:longPress="longPressShift" v-on:repeat="onRepeat"
                keyName="ShiftRight"
            >
                <div class="key-align-right">
                    <div :class="rightShiftLockClass"></div>
                    <img class="icon-shift" src="@/assets/img/mobile/key_shift.png" alt="">
                </div>
            </Key>
        </div>
        <!-- letter row 4 -->
        <div class="row">
            <Key size="x2" keyName="ControlLeft"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-left">
                    Ctrl L
                </div>
            </Key>
            <Key size="x2" v-on:end="switchKeyboard">
                <div class="key-align-left">
                    .?123
                </div>
            </Key>
            <Key size="x1" keyName="AltLeft"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                Alt L
            </Key>
            <Key size="x4" keyName="Space"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <img class="key-blank" src="@/assets/img/mobile/key_blank.png" alt="">
            </Key>
            <Key size="x1" keyName="AltRight"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                Alt R
            </Key>
            <Key size="x2" keyName="ControlRight"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-right">
                    Ctrl R
                </div>
            </Key>
        </div>
    </div>
    <div 
        v-else
        class="keyboard"
    >
    <!-- number row 1 -->
        <div class="row">
            <!-- `-0 -->
            <Key 
                v-for="(key, keyIndex) in NumberKeyMap[0]" :key="keyIndex"
                :keyName="key.key"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div v-if="!shift">
                    <span>{{key.title}}</span>
                    <span class="upTag">{{key.subTitle}}</span>
                </div>
                <div v-else>
                    <span>{{key.subTitle}}</span>
                    <span class="upTag">{{key.title}}</span>
                </div>
            </Key>
            <!-- `-0 end -->
            <!-- backspce -->
            <Key size="x1" keyName="Backspace"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-right">
                    <img class="icon-delete" src="@/assets/img/mobile/key_delete.png" alt="">
                </div>
            </Key>
            <!-- backspace end -->
        </div>
        <!-- number row 2 -->
        <div class="row">
            <Key size="x1" keyName="Tab"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-left">
                    Tab
                </div>
            </Key>
            <Key 
                v-for="(key, keyIndex) in NumberKeyMap[1]" :key="keyIndex"
                :keyName="key.key"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div v-if="!shift">
                    <span>{{key.title}}</span>
                    <span class="upTag">{{key.subTitle}}</span>
                </div>
                <div v-else>
                    <span>{{key.subTitle}}</span>
                    <span class="upTag">{{key.title}}</span>
                </div>
            </Key>
            <Key size="x1" keyName="Escape"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-left">
                    Esc
                </div>
            </Key>
        </div>
        <!-- number row 3 -->
        <div class="row">
            <Key size="x2" v-on:start="shiftStart" v-on:end="shiftEnd" v-on:longPress="longPressShift" v-on:repeat="onRepeat"
                keyName="ShiftLeft"
            >
                <div class="key-align-left">
                    <div :class="leftShiftLockClass"></div>
                    <img class="icon-shift" src="@/assets/img/mobile/key_shift.png" alt="">
                </div>
            </Key>
            <Key 
                v-for="(key, keyIndex) in NumberKeyMap[2]" :key="keyIndex"
                :keyName="key.key"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                {{key.title}}
            </Key>
            <Key size="x2" v-on:start="shiftStart" v-on:end="shiftEnd" v-on:longPress="longPressShift" v-on:repeat="onRepeat"
                keyName="ShiftRight"
            >
                <div class="key-align-right">
                    <div :class="rightShiftLockClass"></div>
                    <img class="icon-shift" src="@/assets/img/mobile/key_shift.png" alt="">
                </div>
            </Key>
        </div>
        <!-- number row 4 -->
        <div class="row">
            <Key size="x2" keyName="ControlLeft"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-left">
                    Ctrl L
                </div>
            </Key>
            <Key size="x2" v-on:end="switchKeyboard">
                <div class="key-align-left">
                    ABC
                </div>
            </Key>
            <Key size="x1" keyName="AltLeft"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                Alt L
            </Key>
            <Key 
                v-for="(key, keyIndex) in NumberKeyMap[3]" :key="keyIndex"
                :keyName="key.key"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                {{key.title}}
            </Key>
            <Key size="x1" keyName="AltRight"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                Alt L
            </Key>
            <Key size="x2" keyName="ControlRight"
                v-on:start="onKeyStart" v-on:end="onKeyEnd" v-on:repeat="onRepeat"
            >
                <div class="key-align-right">
                    Ctrl L
                </div>
            </Key>
        </div>
    </div>
</template>
<script>
import Key              from './key/key'
import { 
    mapState,
    mapMutations, 
    mapActions
}                                    from 'vuex'
import { LetterKeyMap } from './letter_keymap';
import { NumberKeyMap } from './num_keymap';

export default {
    components: {
        Key,
    },
    data() {
        console.log('keymap', LetterKeyMap);
        return {
            letterKeyboard: true,
            capsLock: false,
            shift: false,
            shiftLock: false,
            shiftLockKeyName: '',
            needCancleShifLock: false,
            LetterKeyMap,
            NumberKeyMap,
        }
    },
    computed: {
        showUpCase() {
            return this.shift || this.capsLock;
        },
        capsLockClass() {
            return this.capsLock ? "capslock capslock-lock" : "capslock capslock-unlock";
        },
        leftShiftLockClass() {
            return this.shiftLock ? "shiftlock shiftlock-lock shiftlock-left" : "shiftlock shiftlock-unlock shiftlock-left";
        },
        rightShiftLockClass() {
            return this.shiftLock ? "shiftlock shiftlock-lock shiftlock-right" : "shiftlock shiftlock-unlock shiftlock-right";
        },
        ...mapState({
            larksr: state => state.larksr,
        })
    },
    methods: {
        switchKeyboard() {
            this.letterKeyboard = !this.letterKeyboard;
        },
        onCapsLock(key) {
            console.log('on caps lock', this.capsLock);
            this.capsLock = !this.capsLock;
            // relase capslock.
            this.onKeyEnd(key);
        },
        shiftStart(key) {
            if (this.shiftLock) {
                this.needCancleShifLock = true;
                return;
            }
            this.shift = true;
            // send key event
            this.onKeyStart(key);
        },
        longPressShift(key) {
            console.log("longPressLeftShift");
            this.shiftLock = true;
            this.shiftLockKeyName = key;
        },
        shiftEnd(key) {
            if (this.needCancleShifLock) {
                this.shiftLock = false;
                this.shiftLockKeyName = "";
                this.needCancleShifLock = false;
            }
            if (!this.shiftLock) {
                this.shift = false;
                this.onKeyEnd(key);
            } else {
                console.log('lock shift key. not release.');
            }
        },
        onKeyStart(key) {
            console.log("onKeyStart", key);
            this.larksr.keyDown(key, false);
        },
        onKeyEnd(key) {
            console.log("onKeyEnd", key);
            this.larksr.keyUp(key);
        },
        onRepeat(key) {
            console.log("onRepeat", key);
            this.larksr.keyUp(key, true);
        }
    },
    mounted() {
        console.log('**keyboard mounted.**');
    },
    beforeDestroy() {
        console.log('**before destory.**');
        // send shif release;
        if (this.shiftLock) {
            this.onKeyEnd(this.shiftLockKeyName);
            this.shiftLock = false;
            this.shiftLockKeyName = "";
        }
    },
}
</script>
<style lang="scss" scoped>
@import 'keyboard.scss';
</style>