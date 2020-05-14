import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    modalAction: 'Sign Up',
    existingIngredients: [],
    currentCategory: 'Main Course',
    currentSearch: '',
  },
  mutations: {
    changeState(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    changeModalAction(state, { action }) {
      if (action == 'Sign Up') {
        state.modalAction = 'Sign Up';
      }
      else if (action == 'Log In') {
        state.modalAction = 'Log In';
      }
    },
    updateIngredient(state, { action, item }) {
      if (action == 'add') {
        let itemExist = false;

        for (let i = 0; i < state.existingIngredients.length; i++) {
          if (state.existingIngredients[i].key == item) {
            itemExist = true;
            break;
          }
        }

        if (!itemExist) {
          state.existingIngredients.push({ key: item, value: item });
        }
      }
      else if (action == 'remove') {
        state.existingIngredients.splice(state.existingIngredients.indexOf({ key: item, value: item }), 1);
      }
    },
    updateCategory(state, { category }) {
      state.currentCategory = category;
    },
    updateSearch(state, { title }) {
      state.currentSearch = title;
    }
  }
})