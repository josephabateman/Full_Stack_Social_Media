<template>
  <div class="update-user-details">
    <h1>{{ msg }}</h1>

  <b-button v-b-modal.modal-prevent-closing variant="info">Update Account Details</b-button>
  
    <b-modal
      id="modal-prevent-closing"
      ok-title = "Submit changes"
      ref="modal"
      title="Update Account Details"
      @ok="updateUserDetails"
    >

    <b-form-group>
      <label for="firstName">Change first name</label>
      <b-form-input v-model="firstName" type="text" id="firstName" />
      <br />

      <label for="lastName">Change last name</label>
      <b-form-input v-model="lastName" type="text" id="lastName" />
      <br />

      <label for="password">New password</label>
      <b-form-input v-model="newPassword" type="password" id="password" />
      <br />
    </b-form-group>
   
    </b-modal>    

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
