<template lang="html">
  <div class="card" :class="borderClass" :title="slide.name">
    <img :src="slide.imgSrc" alt="" class="card-img-top">

    <div class="card-body text-center">

      <div v-if="!showResult" class="">
        <div class="form-check form-check-inline">
          <input v-model="selection" class="form-check-input" type="radio" :name="`cvq${_uid}`" :id="`cvq${_uid}t`" :value="true">
          <label class="form-check-label" :for="`cvq${_uid}t`">Violation</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="selection" class="form-check-input" type="radio" :name="`cvq${_uid}`" :id="`cvq${_uid}f`" :value="false">
          <label class="form-check-label" :for="`cvq${_uid}f`">Non-Violation</label>
        </div>
      </div>

      <div v-else class="d-flex justify-content-between align-items-center">
        <span class="fa-2x" :class="iconClass"></span>

        <!-- Button trigger modal -->
        <button @click="$emit('setModalSlide', slide)" type="button" class="btn btn-outline-dark btn-sm m-0" data-toggle="modal" data-target="#exampleModal">
          More Info
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['slide', 'showResult'],
  data () {
    return {
      selection: null
    }
  },
  computed: {
    isCorrect () {
      return this.selection == this.slide.isViolation
    },
    borderClass () {
      if (this.showResult) {
        return (this.isCorrect) ? 'border-success' : 'border-danger'
      }
    },
    iconClass () {
      if (this.showResult) {
        return (this.isCorrect) ? 'fas fa-check text-success' : 'fas fa-times text-danger'
      }
    },
    result () {
      let status = (this.slide.isViolation) ? 'is' : 'is not'
      return `${status} a code violation.`
    }
  }
}
</script>
