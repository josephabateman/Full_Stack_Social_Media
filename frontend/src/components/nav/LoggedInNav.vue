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

      <div class="d-flex justify-content-end">
        <nav>
          <router-link to="/posts" class="p-2">Posts</router-link>
          <router-link to="/my-account" class="p-2">My Account</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    homePage() {
      if (this.$router.history.current.path !== "/posts") {
        this.$router.push({ name: "Posts" });
      }
    },
  },
};
</script>
