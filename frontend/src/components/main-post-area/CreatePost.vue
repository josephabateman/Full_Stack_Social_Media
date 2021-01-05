<template>
  <div class="create-post">
    <h1>{{ msg }}</h1>
    <form enctype="multipart/form-data">

            <label for="writeCaption">Write a caption</label>
            <input type="text" id="writeCaption" v-model="caption">
            <br>

            <label for="file_to_submit">Upload a gif</label>
            <input type="file" id="file_to_submit">
            <br>

            <button type="submit" @click.prevent="createPost"
                    class="btn btn-primary">Create post</button>
        </form>
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
        caption: ''
    };
  },
  methods: {
      createPost: async function () {
        const token = JSON.parse(sessionStorage.getItem('jwt'))
        const userId = JSON.parse(sessionStorage.getItem('userId'))

        // const caption = document.getElementById('writeCaption').
        const file = document.getElementById('file_to_submit').files[0]

        if (this.caption !== '') {
            // console.log(file)
            const fd = new FormData()
            fd.append('myFile', file)
            fd.append('userId', userId)
            fd.append('caption', this.caption)

            const options = {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: fd
            };

            const request = await fetch('http://localhost:5001/posts', options);
            const response = await request.json();
            if (response.error) {
                alert(response.error)
            }
            await this.$emit('reload')
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
