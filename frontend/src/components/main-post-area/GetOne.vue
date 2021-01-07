<template>
  <div class="get-one">
    <button @click.prevent="getOne">fetch one</button>
  </div>
</template>

<script>
export default {
  name: "GetOne",
  props: {
    msg: String,
    postId: String
  },
  data() {
    return {};
  },
  methods: {
    getOne: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));
      const id = this.postId;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await fetch(`http://localhost:5001/${id}`, options);
      const jsonDataFetchOne = await response.json();

      this.fetchOneResult = jsonDataFetchOne;
      // console.log(this.fetchOneResult)
      this.$emit("fetch-one-response", jsonDataFetchOne);
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
