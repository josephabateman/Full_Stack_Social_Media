<template>
  <div class="create-post">

    <b-button v-b-modal.modal-create-post class="btn btn-light">Create Post</b-button>
  
    <b-modal
      id="modal-create-post"
      ok-title = "Publish"
      ref="modal"
      title="Create Post"
      @ok="createPost"
    >

    <b-form-group enctype="multipart/form-data">
      <label for="writeCaption">Write a caption</label>
      <b-input type="text" id="writeCaption" v-model="caption" />
      <br />

      <label for="file_to_submit">Upload a gif</label>
      <b-form-file id="file_to_submit" />
      <br />

    </b-form-group>
   
    </b-modal> 

  </div>
</template>

<script>
export default {
  name: "CreatePost",
  props: {
    msg: String
  },
  data() {
    return {
      caption: "",
    };
  },
  methods: {
    createPost: async function() {
      // this.$emit("reload");
      const token = JSON.parse(sessionStorage.getItem("jwt"));
      const userId = JSON.parse(sessionStorage.getItem("userId"));

      // const caption = document.getElementById('writeCaption').
      const file = document.getElementById("file_to_submit").files[0];

      if (this.caption !== "") {
        // console.log(file)
        const fd = new FormData();
        fd.append("myFile", file);
        fd.append("userId", userId);
        fd.append("caption", this.caption);

        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: fd
        };

        const request = await fetch("http://localhost:5001/posts", options);
        const response = await request.json();
        if (response.error) {
          alert(response.error);
        }
        this.$emit('reload', {btnName: 'show-all-posts', alertMessage: 'Successfully created'});
        this.caption = ""
      }
    },
  }
};
</script>