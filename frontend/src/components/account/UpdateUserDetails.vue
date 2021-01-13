<template>
  <div class="update-user-details">
    <h1>{{ msg }}</h1>

    <b-button v-b-modal.modal-prevent-closing class="btn btn-light"
      >Update Account Details</b-button
    >

    <b-modal
      id="modal-prevent-closing"
      ok-title="Submit changes"
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
    msg: String,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      newPassword: "",
    };
  },
  methods: {
    updateUserDetails: async function() {
      if (this.firstName == "" || this.lastName == "") {
        alert("Please enter a first and last name");
      } else {
        const password = prompt("Please enter your account password");
        const token = JSON.parse(sessionStorage.getItem("jwt"));

        if (this.newPassword == "") {
          this.newPassword = password;
        }
        const data = {
          password: password,
          firstName: this.firstName,
          lastName: this.lastName,
          newPassword: this.newPassword,
        };
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        };
        const request = await fetch(
          "http://localhost:5001/userDetails",
          options
        );
        const jsonResponse = await request.json();
        if (jsonResponse.error) {
          alert(jsonResponse.error);
        } else {
          alert(jsonResponse.message);
        }
      }
      this.firstName = ''
      this.lastName = ''
      this.newPassword = ''
    },
  },
};
</script>
