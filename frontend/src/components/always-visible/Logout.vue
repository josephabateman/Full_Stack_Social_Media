<template>
  <div id="logout">
    <button @click.prevent="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('jwt');
      // vue router redirect is not working
      window.location.href = '/';
      console.log('logged out')
    }
  }
};
</script>