<template>
  <div id="nav">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Signup</router-link>
      <router-link to="/login">Login</router-link>

      <router-link to="/parent-posts-display">ParentPostsDisplay</router-link>
      <router-link to="/my-account">My Account</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
  </div>
</template>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
}

#nav a.router-link-exact-active {
  color: #b94283;
}
</style>
