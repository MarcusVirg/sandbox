<template>
<nav class="nav nav-pills nav-fill bg-light">
  <router-link class="navbar-brand" to="/">Stock Trader</router-link>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <router-link class="nav-link active" to="/stocks">Stocks</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Save Data</a>
        <a class="dropdown-item" href="#">Load Data</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">End Day</a>
      </div>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
