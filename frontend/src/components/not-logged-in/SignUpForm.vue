<template>
  <div class="sign-up-form">
    <h1>{{ msg }}</h1>

  <b-container class="bv-example-row">
    <b-row class="d-flex justify-content-center">
      <b-col md="6">

        <b-form class="text-md-left">
          <div class="first-name mt-3">
            <label for="name">First Name: </label>
            <b-form-input
              type="text"
              v-model="firstName"
              name="first-name"
              id="first-name"
              required
            />
          </div>
          <div class="last-name mt-3">
            <label for="first-name">Last Name: </label>
            <b-form-input
              type="text"
              v-model="lastName"
              name="last-name"
              id="last-name"
              required
            />
          </div>
          <div class="email mt-3">
            <label for="email">Email: </label>
            <b-form-input type="email" v-model="email" name="email" id="email" required />
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
          <b-button @click.prevent="signup" variant="primary" class="mt-3">Sign up</b-button>
        </b-form>

      </b-col>
      <!-- <b-col>2 of 3</b-col>
      <b-col>3 of 3</b-col> -->
    </b-row>
  </b-container>

    

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
      if (
        this.email === "" ||
        this.password === "" ||
        this.firstName === "" ||
        this.lastName === ""
      ) {
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
          this.$emit("pass-credentials", { ...data });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
