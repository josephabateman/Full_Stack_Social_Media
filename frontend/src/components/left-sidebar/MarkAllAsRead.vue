<template>
  <div class="mark-all-as-read">
    <b-button @click.prevent="markAllAsRead" class="btn btn-light">Mark all read</b-button>

  </div>
</template>

<script>
export default {
name: "MarkAllAsRead",
  data() {
    return {
      
    }
  },
methods: {
    markAllAsRead: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));

      const options = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      const request = await fetch(
        "http://localhost:5001/posts/markAllAsRead",
        options
      );
      const response = await request.json();
      if (response.error) {
        alert(response.error);
      }
      // this.unreadPostsNum = 0
      this.$emit("reload");
    }
  }
};
</script>
