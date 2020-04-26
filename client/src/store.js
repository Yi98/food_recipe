import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    modalAction: 'Sign Up',
  },
  mutations: {
    changeState(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    changeModalAction(state, {action}) {
      if (action == 'Sign Up') {
        state.modalAction = 'Sign Up';
      }
      else if (action == 'Log In') {
        state.modalAction = 'Log In';
      }
    }
  }
})