<template>
  <div class="delete-comment">
    <button @click.prevent="deleteComment">x</button>
    <!-- v-if="comment.userId === userId" -->
  </div>
</template>

<script>
export default {
  name: "DeleteComment",
  props: {
    commentId: String,
    postArray: Array
  },
  data() {
    return {};
  },
  methods: {
    deleteComment: async function() {
      if (confirm("Your comment will be permanently deleted")) {
        const token = JSON.parse(sessionStorage.getItem("jwt"));

        let postId;
        let comment;
        let userId;
        let firstName;
        let lastName;

        const commentId = this.commentId;

        for (let post of this.postArray) {
          for (let commentList of post.comments) {
            try {
              if (commentList.commentId === commentId) {
                postId = commentList.postId;
                comment = commentList.comment;
                userId = commentList.userId;
                firstName = commentList.firstName;
                lastName = commentList.lastName;
              }
            } catch (error) {
              console.log(
                "likely a database error such as a null value" + error
              );
            }
          }
        }

        const data = {
          commentId: commentId,
          userId: userId,
          comment: comment,
          postId: postId,
          firstName: firstName,
          lastName: lastName
        };

        const options = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        };
        const request = await fetch(
          "http://localhost:5001/deleteComment",
          options
        );
        const jsonResponse = await request.json();
        if (jsonResponse.error) {
          alert(jsonResponse.error);
        } else {
          this.$emit("reload");
        }
      } else {
        console.log("comment not deleted");
      }
    }
  }
};
</script>
