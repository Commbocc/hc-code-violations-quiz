<template>
  <div id="app" class="d-flex flex-column">

    <section class="bg-white py-5">
      <div class="container">

        <div class="text-center">
          <!-- <img src="./assets/logo.png"> -->

          <h1 class="">
            Hillsborough County Code Violations Quiz
          </h1>

          <div class="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>

        <details v-if="false">
          <pre class="bg-light p-3">{{ $store.state }}</pre>
        </details>
      </div>
    </section>

    <section class="bg-dark py-5">
      <div class="container">

        <div ref="cards" class="row">
          <div  v-for="slide in $store.state.slides.index" class="col-sm-6 col-md-4">
            <div is="Card" class="card mb-3" :slide="slide" :show-result="showResults" @setModalSlide="setModal"></div>
          </div>
        </div>

        <div class="text-center">
          <button @click="submit" class="btn btn-lg btn-primary mt-3">
            {{ btnText }}
          </button>
        </div>

      </div>
    </section>

    <!-- Modal -->
    <div is="Modal" :slide="modalSlide"></div>

  </div>
</template>

<script>
import Card from './components/Card'
import Modal from './components/Modal'

export default {
  name: 'app',
  components: { Card, Modal },
  data () {
    return {
      showResults: false,
      modalSlide: null
    }
  },
  computed: {
    btnText () {
      return (this.showResults) ? 'Reset' : 'Get Results'
    }
  },
  methods: {
    setModal (slide) {
      this.modalSlide = slide
    },
    submit () {
      this.showResults = !this.showResults
      if (this.showResults) {
        this.tally()
      } else {
        this.reset()
      }
    },
    tally () {
      let correct = 0
      this.$children.forEach(x => {
        try {
          if (x.isCorrect) {
            correct++
          }
        } catch (e) {
          // not a card
        }
      })
      alert(`${correct} of ${this.$store.state.slides.index.length} correct.`)
    },
    reset () {
      this.$children.forEach(x => {
        try {
          x.selection = null
        } catch (e) {
          // not a card
        }
      })
      this.$store.dispatch('shuffleSlides')
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style src="./assets/main.scss" lang="scss"></style>
