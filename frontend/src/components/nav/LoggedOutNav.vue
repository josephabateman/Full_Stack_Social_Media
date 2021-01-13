<template>
  <div id="nav">
    <div class="container">
      <div class="row d-flex float-left">
        <div class="" @click.prevent="homePage" style="cursor:pointer">
          <img
            id="logo"
            class="mb-3"
            alt="Vue logo"
            src="../../assets/Groupomania_Logos/icon-left-font.png"
            width="200px"
          />
        </div>
      </div>

      <div class="col-md d-flex justify-content-end">
        <nav>
          <router-link to="/" class="p-2">Home</router-link>
          <router-link to="/signup" class="p-2">Signup</router-link>
          <router-link to="/login" class="p-2">Login</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    homePage() {
      if (this.$router.history.current.path !== "/") {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
