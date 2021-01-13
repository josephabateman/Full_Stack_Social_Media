<template>
  <div class="log-in-form">
    <h1>{{ msg }}</h1>

    <b-container class="bv-example-row">
      <b-row class="d-flex justify-content-center">
        <b-col md="6">
          <b-form class="text-md-left">
            <div class="email mt-3">
              <label for="email">Email: </label>
              <b-form-input
                type="email"
                v-model="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div class="password mt-3">
              <label for="password">Password: </label>
              <b-form-input
                type="password"
                v-model="password"
                name="password"
                id="password"
                required
              />
            </div>
            <b-button @click.prevent="login" variant="primary" class="mt-3"
              >Log In</b-button
            >
          </b-form>
        </b-col>
        <!-- <b-col>2 of 3</b-col>
      <b-col>3 of 3</b-col> -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "LogInForm",
  data() {
    return {
      email: "",
      password: "",
      userId: "",
    };
  },
  props: {
    msg: String,
  },
  methods: {
    // i previously passed in email and password as arguments - maybe do that again
    login: async function() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const request = await fetch("http://localhost:5001/login", options);
        const response = await request.json();
        if (response.error) {
          alert(response.error);
        }
        if (response.token !== undefined) {
          sessionStorage.setItem("jwt", JSON.stringify(response.token));
          sessionStorage.setItem("userId", JSON.stringify(response.userId));
          sessionStorage.setItem("loggedIn", "true");

          // change from user id to something else
          const parsedUserId = JSON.parse(sessionStorage.getItem("userId"));
          this.userId = parsedUserId;

          // location.reload()
          this.$emit("show-logged-in-nav");

          //redirect to logged in home page
          this.$router.push({ name: "Posts" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
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
