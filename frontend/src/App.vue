<template>
  <div id="app">
    <LoggedInNav v-if="loggedIn" />
    <LoggedOutNav v-if="!loggedIn" />
    <router-view v-on:show-not-logged-in-nav="logoutFunc" v-on:show-logged-in-nav="loginFunc" />
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
    logoutFunc() {
      this.loggedIn = false
    },
    loginFunc() {
      this.loggedIn = true
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
