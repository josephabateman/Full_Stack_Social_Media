<template>
  <div id="app">
    <LoggedInNav v-if="loggedIn" :key="loggedIn" />
    <LoggedOutNav v-if="!loggedIn" :key="loggedIn" />   
       
    <div class="container">
      <div class="row">
        <div class="col">
          <Logout v-if="loggedIn" v-on:show-not-logged-in-nav="switchNav" class="d-flex justify-content-end" />
        </div>
      </div>
    </div>

    <router-view v-on:show-logged-in-nav="switchNav" v-on:show-not-logged-in-nav="switchNav" />

  </div>
</template>
<script>
import LoggedInNav from "@/components/always-visible/LoggedInNav";
import LoggedOutNav from "@/components/always-visible/LoggedOutNav";
import Logout from "@/components/main-post-area/Logout.vue";

export default {
  name: "App",
  components: {
    LoggedInNav,
    LoggedOutNav,
    Logout
  },
  data() {
    return {
      loggedIn: false
    }
  },
 created: function() {
   if (sessionStorage.getItem("loggedIn") === 'true') {
     this.loggedIn = true
   } else {
     this.loggedIn = false
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
