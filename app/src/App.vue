<template>
  <div id="app">
    <StarNotary />
  </div>
</template>

<script>
import StarNotary from "./components/StarNotary.vue";

export default {
  name: "app",
  components: {
    StarNotary
  }
};
</script>

<style>
body {
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
