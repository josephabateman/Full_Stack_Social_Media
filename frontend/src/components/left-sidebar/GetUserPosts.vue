<template>
  <div class="get-user-posts">
    <b-button id="get-user-posts" @click.prevent="getUserPosts" class="btn btn-light">My Posts</b-button>
  </div>
</template>

<script>
export default {
  name: "GetUserPosts",
  props: {
    commentId: String,
    postArray: Array,
    btnClicked: String
  },
  data() {
    return {};
  },
 watch: {
    btnClicked() {
      const btn = document.getElementById('get-user-posts')
      if (this.btnClicked !== 'get-user-posts') {
        btn.classList = 'btn btn-light' 
      } 
    }
  },
  methods: {
    getUserPosts: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      //make more secure
      const response = await fetch(`http://localhost:5001/userId`, options);
      const jsonDataUserPosts = await response.json();
      if (jsonDataUserPosts.error) {
        alert(jsonDataUserPosts.error);
      }
      const btn = document.getElementById('get-user-posts')
      btn.classList = 'btn btn-primary' 
      this.$emit("get-user-posts", jsonDataUserPosts);
    }
  }
};
</script>
