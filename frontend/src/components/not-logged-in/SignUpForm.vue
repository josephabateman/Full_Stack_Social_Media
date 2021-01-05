<template>
  <div class="sign-up-form">
    <h1>{{ msg }}</h1>
    <form>
      <div class="first-name">
        <label for="name">First Name: </label>
        <input
          type="text"
          v-model="firstName"
          name="first-name"
          id="first-name"
          required
        />
      </div>
      <div class="last-name">
        <label for="first-name">Last Name: </label>
        <input
          type="text"
          v-model="lastName"
          name="last-name"
          id="last-name"
          required
        />
      </div>
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
        <input value="Sign Up" type="submit" @click.prevent="signup" />
      </div>
    </form>

    <!-- <button @click="passCredentials">Emit Event</button> -->
  </div>
</template>

<script>
export default {
  name: "SignUpForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  },
  props: {
    msg: String
  },
  methods: {
    signup: async function() {
      //basic validation
      if (this.email === "" || this.password === "" || this.firstName === "" || this.lastName === "") {
        alert("Please complete all fields");
        return;
      }

      try {
        const data = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        };
        
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        const request = await fetch("http://localhost:5001/signup", options);
        const response = await request.json();
        if (response.error) {
          alert(response.error);
        } else {
          alert("successfully signed up");
          this.$emit("pass-credentials", {...data});
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
