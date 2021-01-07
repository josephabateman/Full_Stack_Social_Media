<template>
  <div class="my-account">
    <UpdateUserDetails msg="" />
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
