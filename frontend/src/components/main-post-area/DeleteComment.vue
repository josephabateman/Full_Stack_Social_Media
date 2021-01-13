<template>
  <div class="delete-comment">
    <b-button
      class="border bg-white text-danger"
      @click.prevent="deleteComment"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
        />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "DeleteComment",
  props: {
    commentId: String,
    postArray: Array,
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
          lastName: lastName,
        };

        const options = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
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
    },
  },
};
</script>
