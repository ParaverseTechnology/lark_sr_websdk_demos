import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    // Host: "https://cloudlark.pingxingyun.com:8182/",
    // Host: "https://cloudlark.pingxingyun.com:8180/",
    // Host: "http://192.168.0.55:8181/",
    // Host: "http://222.128.6.137:8585/",
    Host: "",
  },
  getters: {},
  mutations: {
    setHost(state, host) {
      state.Host = host;
    },
  },
  actions: {
    // commit, state, getters, dispatch
    saveHost({
      commit
    }, host) {
      commit('setHost', host);
      // 去空格
      host = host.trim();
      localStorage.setItem('host', host);
      try {
        const url = new URL(host);
        console.log('native saveserver address ', url, url.hostname, url.port);
      } catch (e) {
        console.warn('parse host url failed', host);
      }
    },

    restoreHost({
      commit
    }) {
      let host = localStorage.getItem('host');
      if (host) {
        commit('setHost', host);
      }
      try {
        const url = new URL(host);
        console.log('native saveserver address ', url, url.hostname, url.port);
      } catch (e) {
        console.warn('parse host url failed', host);
      }
    },
  },
  modules: {}
})