<template>
  <div class="mark-all-as-read">
    <b-button id="mark-all-as-read-btn" @click.prevent="markAllAsRead" class="btn btn-light">Mark all read</b-button>

  </div>
</template>

<script>
export default {
name: "MarkAllAsRead",
  data() {
    return {
      
    }
  },
props: {
    btnClicked: String
  },
 watch: {
    btnClicked() {
      const btn = document.getElementById('mark-all-as-read-btn')
      if (this.btnClicked !== 'mark-all-as-read-btn') {
        btn.classList = 'btn btn-light' 
      }
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
      const btn = document.getElementById('mark-all-as-read-btn')
      btn.classList = 'btn btn-primary' 
      this.$emit("reload", 'mark-all-as-read-btn');
    }
  }
};
</script>
