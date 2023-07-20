import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {
    changeAge(age) {
      this.$emit('ageWasEdited', age)
    }
  }
}) // Use a new Vue instance for a central place to store methods and data to access accross different components

new Vue({
  el: '#app',
  render: h => h(App)
})
