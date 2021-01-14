<template>
  <div class="modify-post">
    <b-button v-b-modal.:id="modalId" variant="info">Modify Post</b-button>

    <b-modal
      :id="modalId"
      ok-title="Submit changes"
      ref="modal"
      title="Edit Post"
      @ok="modifyPost"
    >
      <b-form-group enctype="multipart/form-data">
        <label for="modifyCaption">modify caption</label>
        <input type="text" v-model="caption" />
        <br />

        <label for="file_to_submit">Upload a gif</label>
        <b-form-file :id="fileId" />
        <br />
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModifyPost",
  props: {
    msg: String,
    postId: String
  },
  data() {
    return {
      caption: "",
      modalId: "",
      fileId: ""
    };
  },
  mounted() {
    this.ids();
  },
  methods: {
    ids() {
      this.modalId = "modal-modify-post-" + this.postId;
      this.fileId = "modify_file_to_submit-" + this.postId;
    },
    modifyPost: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));
      const caption = this.caption;
      const file = document.getElementById(this.fileId).files[0];
      const postId = this.postId;

      if (caption !== "") {
        const fd = new FormData();
        fd.append("myFile", file);
        fd.append("caption", caption);
        fd.append("postId", postId);

        const options = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: fd
        };

        const response = await fetch("http://localhost:5001/posts", options);
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
          alert(jsonResponse.error);
        }
        this.$emit("reload", {
        btnName: "show-all-posts",
        alertMessage: "Showing all posts"
      });
        this.caption = "";
      }
    }
  }
};
</script>
