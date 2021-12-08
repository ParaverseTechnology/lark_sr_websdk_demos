import Capabilities from '@/utils/capabilities';
import Unit from '@/utils/unit';

export const RootActions/*: ActionTree<RootState, RootState>*/ = {
    resize({ commit, state, getters }) {
        // 浏览器窗口宽
        let screenW = getters.screenOrientation === 'landscape' ? 
                Unit.viewport().height :
                Unit.viewport().width;
        let pixUnit = screenW / 100;

        if (Capabilities.isMobile) {
            // resize rem.
            document.documentElement.style.fontSize = pixUnit + 'px';
        } else {
            // document.documentElement.style.fontSize = screenW / 200 + 'px';
            document.documentElement.style.fontSize = '9px';
        }
        commit('setMobilePixelUnit', pixUnit);
    },
    // keyboard,menu,joystick  同时只显示一个
    toggleVKeyboard({commit, state}) {
        commit('setVirtualKeyboard', !state.vkeyboard);
        if (state.vkeyboard) {
            commit('setMenu', false);
            commit('setJoyStick', false);
        }
    },
    toggleMenu({commit, state, dispatch}) {
        commit('setMenu', !state.menu);
        if (state.menu) {
            commit('setVirtualKeyboard', false);
            commit('setJoyStick', false);
        }
    },
    toggleJoyStick({commit, state, dispatch}) {
        commit('setJoyStick', !state.joystick);
        if (state.joystick) {
            commit('setVirtualKeyboard', false);
            commit('setMenu', false);
        }
    },
    toggleVMouseMode({ commit, state, getters,dispatch }) {
        if (state.vmouseMode == 'vmouse') {
            commit('setVmouseMode', 'pointer');
        } else {
            commit('setVmouseMode', 'vmouse');
        }
    },
};

export default RootActions;
