<template>
  <div class="individual-post">
    <GetOne />
  </div>
</template>

<script>
// @ is an alias to /src
import GetOne from "@/components/main-post-area/GetOne.vue";

export default {
  name: "Login",
  components: {
    GetOne,
  },
};
</script>
