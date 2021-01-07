<template>
  <div class="post-comment">
    <!-- <h1>{{ msg }}</h1> -->
    <form action="">
      <input v-model="writeComment" placeholder="write a comment..." />
      <button @click.prevent="postComment">+</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostComment",
  props: {
    msg: String,
    postId: String
  },
  data() {
    return {
      writeComment: ""
    };
  },
  methods: {
    postComment: async function() {
      // const writeAComment = prompt('write a comment')
      const token = JSON.parse(sessionStorage.getItem("jwt"));

      if (this.writeComment == null) {
        console.log("not posted");
      } else if (this.writeComment !== "") {
        const data = {
          comment: this.writeComment,
          post_Id: this.postId
        };

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        };

        const request = await fetch(
          "http://localhost:5001/addComment",
          options
        );
        const response = await request.json();
        if (response.error) {
          alert(response.error);
        }
        // await this.fetchPosts()
        this.writeComment = "";
        this.$emit("reload");
      } else {
        alert("can not be empty");
      }
    }
  }
};
</script>
