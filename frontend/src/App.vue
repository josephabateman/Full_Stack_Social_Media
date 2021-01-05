<template>
  <div id="app">
    <TheNavigation />
    <Logout />
    <router-view />
    <!-- <p>always see</p> -->
  </div>
</template>
<script>
import TheNavigation from "@/components/always-visible/TheNavigation";
import Logout from "@/components/always-visible/Logout";

export default {
  components: {
    TheNavigation,
    Logout
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
