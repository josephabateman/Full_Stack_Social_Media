<template>
  <div id="nav">

    <div class="container">
      <div class="row">
        <div class="col-md-8 d-flex justify-content-start">
          <img class="mb-3"
            alt="Vue logo"
            src="../../assets/Groupomania_Logos/icon-left-font.png"
            width="300"
          />
        </div>
        <div class="col-md d-flex justify-content-end">
           <nav>
            <router-link to="/parent-posts-display">Posts</router-link>
            <router-link to="/my-account">My Account</router-link>   
          </nav>
        </div>
      </div>
    </div>

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
