import Vue from 'vue'
import GoogleSheetModel from 'google-sheet-model'
import shuffle from 'lodash.shuffle'

export default {
  state: {
    index: []
  },
  actions: {
    loadData ({ dispatch }) {
      let Sheet = Vue.extend(GoogleSheetModel)

      let data = new Sheet({
        propsData: {
          sheetId: '1JQ52N8ZM_6re6YIgShAMWqfrHF4oiMYNej5_3n6J2WI',
          tableId: 1,
          fields: ['name', 'description', 'imgsrc', 'isviolation']
        }
      })

      return data.fetchJson().then(() => {
        return dispatch('shuffleSlides', data.instances.map(x => new Slide(x)))
      })
    },
    shuffleSlides ({ state, commit }, slides = null) {
      slides = (slides) ? slides : state.index
      commit('setSlides', shuffle(slides))
    }
  },
  mutations: {
    setSlides (state, data) {
      state.index = data
    }
  }
}

class Slide {
  constructor (x) {
    this.name = x.name
    this.description = x.description
    this.imgSrc = x.imgsrc
    this.isViolation = (x.isviolation == 'TRUE')
  }
}
