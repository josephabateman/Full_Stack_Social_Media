<template>
  <div class="post-comment">
    
      <b-row class="d-flex justify-content-center">
        <b-col>
          <b-input class="shadow p-3 bg-white rounded" v-model="writeComment" placeholder="write a comment..." />
        </b-col>
          <b-button class="mr-3" @click.prevent="postComment">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
          </b-button>
      </b-row>
  
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
