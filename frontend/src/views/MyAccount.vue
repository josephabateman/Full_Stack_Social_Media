<template>
  <div class="my-account">
    <DeleteAccount msg="" />
    <p>my details - put request to change first name, last name, password</p>
  </div>
</template>

<script>
// @ is an alias to /src
import DeleteAccount from "@/components/account/DeleteAccount.vue";

export default {
  name: "MyAccount",
  components: {
    DeleteAccount
  }
};
</script>