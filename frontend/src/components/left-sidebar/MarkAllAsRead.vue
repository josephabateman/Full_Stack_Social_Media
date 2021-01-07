<template>
  <div class="mark-all-as-read">
    <button @click.prevent="markAllAsRead">Mark all as read</button>
  </div>
</template>

<script>
export default {
  name: "MarkAllAsRead",
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
