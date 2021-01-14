<template>
  <div class="delete-account">
    <b-button @click.prevent="deleteAccount" class="btn btn-danger"
      >Delete Account</b-button
    >
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "DeleteAccount",
  props: {
    msg: String
  },
  methods: {
    deleteAccount: async function() {
      const deletePostsToo = prompt(
        "This will also delete all your past posts. Are you sure you want to proceed? Type YES to proceed"
      );

      if (deletePostsToo === "yes" || deletePostsToo === "YES") {
        const token = JSON.parse(sessionStorage.getItem("jwt"));
        const password = prompt("Please enter your account password");

        const data = {
          password: password
        };
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        };
        const request = await fetch(
          "http://localhost:5001/deleteUser",
          options
        );
        const jsonResponse = await request.json();
        if (jsonResponse.error) {
          alert(jsonResponse.error);
        } else {
          alert(jsonResponse.message);
        }
        this.logout();
      }
    },
    logout() {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("jwt");
      sessionStorage.setItem("loggedIn", "false");
      this.$emit("show-not-logged-in-nav");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
