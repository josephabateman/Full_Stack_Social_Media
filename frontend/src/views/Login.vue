<template>
  <div class="login">
    <LogInForm msg="Log In" v-on:show-logged-in-nav="$emit('show-logged-in-nav')" />
  </div>
</template>

<script>
// @ is an alias to /src
import LogInForm from "@/components/not-logged-in/LogInForm.vue";

export default {
  name: "Login",
  components: {
    LogInForm
  }
};
</script>
