import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    changeState (state) {
      state.isLoggedIn = !state.isLoggedIn;
    }
  }
})