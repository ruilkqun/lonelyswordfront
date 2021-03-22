import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import permission from './modules/permission'
import getters from "./getters";
const store = new Vuex.Store({
  modules: {
    permission
  },
  getters
})



export default store
