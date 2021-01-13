<template>
  <div class="signup">
    <SignUpForm msg="Sign Up" @pass-credentials="loginFromSignup"></SignUpForm>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/components/not-logged-in/SignUpForm.vue";

export default {
  name: "Signup",
  components: {
    SignUpForm,
  },
  methods: {
    loginFromSignup: async function(payload) {
      try {
        const data = {
          email: payload.email,
          password: payload.password,
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

          //redirect to logged in home page
          this.$emit("show-logged-in-nav");
          this.$router.push({ name: "Posts" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
