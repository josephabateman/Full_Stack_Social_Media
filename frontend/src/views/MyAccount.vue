<template>
  <div class="my-account">
    <UpdateUserDetails msg="" class="mb-3"/>
    
    <b-button variant="outline-info" class="mb-3">My Posts - link to my posts on post page</b-button>

    <DeleteAccount msg="" />

  </div>
</template>

<script>
// @ is an alias to /src
import DeleteAccount from "@/components/account/DeleteAccount.vue";
import UpdateUserDetails from "@/components/account/UpdateUserDetails.vue";

export default {
  name: "MyAccount",
  components: {
    DeleteAccount,
    UpdateUserDetails
  }
};
</script>
