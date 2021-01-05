<template>
  <div class="modify-post">
     <form id="modify-post" enctype="multipart/form-data">
        <label for="modifyCaption">modify caption</label>
        <input type="text" id="modifyCaption" v-model="caption">
        <br>

        <label for="file_to_submit">Upload a gif</label>
        <input type="file" id="modify_file_to_submit">
        <br>

        <button type="submit" @click.prevent="modifyPost" class="btn btn-primary">modify post</button>
      </form>

    <button @click.prevent="modifyPost">fetch one</button>
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
       caption: ''
    };
  },
  methods: {
   modifyPost: async function () {
    const token = JSON.parse(sessionStorage.getItem('jwt'))
    const caption = this.caption
    const file = document.getElementById("modify_file_to_submit").files[0]
    const postId = this.postId;

    if (caption !== '') {
        const fd = new FormData()
        fd.append('myFile', file)
        fd.append('caption', caption)
        fd.append('postId', postId)

        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: fd
        };

        const response = await fetch('http://localhost:5001/posts', options);
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
            alert(jsonResponse.error)
        }
        await this.$emit('reload')
      }
    }
  }
 
};
</script>
