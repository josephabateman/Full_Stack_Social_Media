<template>
  <div class="get-one">
    <b-button class="btn-sm" @click.prevent="getOne" variant="info">See all comments</b-button>
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