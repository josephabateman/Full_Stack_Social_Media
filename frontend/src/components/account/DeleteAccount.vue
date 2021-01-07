<template>
  <div class="delete-account">
    <b-button @click.prevent="deleteAccount" variant="outline-danger">Delete Account</b-button>
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

        //run logout method to delete session storage an send to home page
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
