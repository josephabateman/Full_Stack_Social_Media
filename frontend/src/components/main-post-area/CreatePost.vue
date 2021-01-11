<template>
  <div class="create-post">

    <b-button v-if="dismissCountDown==0" v-b-modal.modal-create-post class="btn btn-light">Create Post</b-button>
  
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

     <!-- alert on success -->
     <b-alert
     class="p-3 mb-3"
      :show="dismissCountDown"
      
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Post successfully created</p>

      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>


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
      dismissSecs: 4,
      dismissCountDown: 0
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
        await this.$emit('reload', 'show-all-posts');
        this.caption = ""
        this.showAlert()
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
  }
};
</script>