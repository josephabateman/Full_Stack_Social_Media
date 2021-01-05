<template>
  <div class="get-user-posts">
    <button @click.prevent="getUserPosts">Show My Posts</button>
  </div>
</template>

<script>
export default {
  name: "GetUserPosts",
  props: {
    commentId: String,
    postArray: Array
  },
  data() {
    return {
       
    };
  },
  methods: {
    getUserPosts: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));

      const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

//make more secure
      const response = await fetch(`http://localhost:5001/userId`, options);
      const jsonDataUserPosts = await response.json();
      if (jsonDataUserPosts.error) {
                alert(jsonDataUserPosts.error)
            }
        this.$emit('get-user-posts', jsonDataUserPosts)
    }
  }
 
};
</script>