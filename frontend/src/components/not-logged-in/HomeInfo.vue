<template>
  <div class="home-info">
    <h1>{{ msg }}</h1>
    <p>
      Here you can connect with colleagues you wouldn't usually get to know.<br />
      <br />
      If you do not yet have an account,
      <router-link to="/signup">Sign up</router-link>. Or if you already have an
      account, <router-link to="/login">Log in</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  name: "HomeInfo",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
