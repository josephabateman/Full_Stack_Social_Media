<template>
  <div class="delete-post">
    <button @click.prevent="deletePost">Delete Post</button>
  </div>
</template>

<script>
export default {
  name: "DeletePost",
  props: {
    postId: String
  },
  methods: {
      deletePost: async function () {
      if (confirm("Your post and all comments will be permanently deleted")) {
        const postId = this.postId
        const token = JSON.parse(sessionStorage.getItem('jwt'))

        const data = {
            postId
        }

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };
        const request = await fetch('http://localhost:5001/posts', options)
        const jsonResponse = await request.json()
        if (jsonResponse.error) {
            alert(jsonResponse.error)
        } else {
            alert(jsonResponse.message)
        }
        this.$emit('reload')
      } else {
        console.log('post shall stay')
      }
    }
  }
};
</script>