<template>
  <div id="logout">
    <b-button @click.prevent="logout" class="btn btn-secondary">Logout</b-button>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("jwt");
      // vue router redirect is not working
      sessionStorage.setItem("loggedIn", 'false');
      this.$emit('show-not-logged-in-nav')
      // window.location.href = "/";
      this.$router.push({ name: 'Login' })
    }
  }
};
</script>
