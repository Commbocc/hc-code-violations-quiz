import Vue from 'vue'
import Vuex from 'vuex'

import GoogleSheetModel from 'google-sheet-model'

import slides from './modules/slides'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { slides }
})
