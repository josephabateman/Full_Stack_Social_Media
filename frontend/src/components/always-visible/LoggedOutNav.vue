<template>
  <div id="nav">

    <div class="container">
      <div class="row">
        <div @click.prevent="homePage" style="cursor:pointer" class="col-md-9 d-flex justify-content-start">
           <img 
              class="mb-3"
              alt="Vue logo"
              src="../../assets/Groupomania_Logos/icon-left-font.png"
              width="200px"
            />
        </div>
        <div class="col-md d-flex justify-content-end">
             <nav>
              <router-link to="/">Home</router-link>
              <router-link to="/signup">Signup</router-link>
              <router-link to="/login">Login</router-link>
            </nav>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    homePage() {
      if (this.$router.history.current.path !== '/') {
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

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
