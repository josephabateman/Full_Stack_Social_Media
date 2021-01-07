<template>
  <div class="log-in-form">
    <h1>{{ msg }}</h1>
    <form>
      <div class="email">
        <label for="email">Email: </label>
        <input type="email" v-model="email" name="email" id="email" required />
      </div>
      <div class="password">
        <label for="password">Password: </label>
        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
          required
        />
      </div>
      <div class="form-example">
        <input value="Log In" type="submit" @click.prevent="login" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LogInForm",
  data() {
    return {
      email: "",
      password: "",
      userId: ""
    };
  },
  props: {
    msg: String
  },
  methods: {
    // i previously passed in email and password as arguments - maybe do that again
    login: async function() {
      try {
        const data = {
          email: this.email,
          password: this.password
        };
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        const request = await fetch("http://localhost:5001/login", options);
        const response = await request.json();
        if (response.error) {
          alert(response.error);
        }
        if (response.token !== undefined) {
          sessionStorage.setItem("jwt", JSON.stringify(response.token));
          sessionStorage.setItem("userId", JSON.stringify(response.userId));
          // this.email = ''
          // this.password = ''
          // this.loggedIn = true

          // change from user id to something else
          const parsedUserId = JSON.parse(sessionStorage.getItem("userId"));
          this.userId = parsedUserId;

          // await this.fetchPosts()
          window.location.href = "/#/parent-posts-display";
          //redirect to logged in home page
        }
      } catch (error) {
        console.log(error);
      }
    }
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
