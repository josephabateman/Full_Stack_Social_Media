<template>
  <div class="update-user-details">
    <h1>{{ msg }}</h1>

    <form>
      <label for="firstName">Change first name</label>
      <input v-model="firstName" type="text" id="firstName" />
      <br />

      <label for="lastName">Change last name</label>
      <input v-model="lastName" type="text" id="lastName" />
      <br />

      <label for="password">New password</label>
      <input v-model="newPassword" type="password" id="password" />
      <br />

      <button
        type="submit"
        @click.prevent="updateUserDetails"
        class="btn btn-primary"
      >
        Update your details
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateUserDetails",
  props: {
    msg: String
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      newPassword: ""
    };
  },
  methods: {
    updateUserDetails: async function() {
      const password = prompt("Please enter your account password");

      const token = JSON.parse(sessionStorage.getItem("jwt"));

      const data = {
        password: password,
        firstName: this.firstName,
        lastName: this.lastName,
        newPassword: this.newPassword
      };
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      };
      const request = await fetch("http://localhost:5001/userDetails", options);
      const jsonResponse = await request.json();
      if (jsonResponse.error) {
        alert(jsonResponse.error);
      } else {
        alert(jsonResponse.message);
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
