<template>
  <div class="login">
    <LogInForm msg="Log In" />
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
