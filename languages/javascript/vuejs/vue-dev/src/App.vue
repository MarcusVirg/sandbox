<template>
    <div>
      <app-header></app-header>
      <hr>
      <div class="row">
        <app-servers></app-servers>
        <app-server-details></app-server-details>
      </div>
      <hr>
      <app-footer></app-footer>
    </div>
</template>

<script>
import Header from './components/Header.vue' // import the header object/template from Header.vue
import Footer from './components/Footer.vue'
import Servers from './components/Server.vue'
import ServerDetails from './components/ServerDetails.vue'

export default {
  components: { // Register all components locally
    'app-header': Header,
    'app-servers': Servers,
    'app-server-details': ServerDetails,
    'app-footer': Footer
  }
}
</script>

<style>
h1, h3, p {
  color: darkgoldenrod;
}
body {
  background-color: rgb(48, 48, 48);
}
</style>
