<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/Groupomania_Logos/icon.png"
      width="300"
    />
    <HomeInfo msg="Groupomania - the social network" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeInfo from "@/components/not-logged-in/HomeInfo.vue";

export default {
  name: "Home",
  components: {
    HomeInfo,
  },
};
</script>
