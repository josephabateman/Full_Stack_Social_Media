<template>
  <div id="app">
    <LoggedInNav v-if="loggedIn" :key="loggedIn" />
    <LoggedOutNav v-if="!loggedIn" :key="loggedIn" />   
    <router-view v-on:show-logged-in-nav="switchNav" v-on:show-not-logged-in-nav="switchNav" />

  </div>
</template>
<script>
import LoggedInNav from "@/components/always-visible/LoggedInNav";
import LoggedOutNav from "@/components/always-visible/LoggedOutNav";

export default {
  name: "App",
  components: {
    LoggedInNav,
    LoggedOutNav
  },
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    switchNav() {
      if (sessionStorage.getItem("loggedIn") === 'true') {
        this.loggedIn = true
      } else {
         this.loggedIn = false
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
