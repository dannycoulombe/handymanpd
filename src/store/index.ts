import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    background: null,
    forceFlatToolbar: false,
  },
  mutations: {
    background(state, value) {
      state.background = value;
    },
    forceFlatToolbar(state, value) {
      state.forceFlatToolbar = value;
    },
  },
})
