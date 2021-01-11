<template>
  <div class="get-user-posts">
    <b-button id="show-all-posts" @click.prevent="showAllPosts" class="btn btn-success">All Posts</b-button>
  </div>
</template>

<script>
export default {
  name: "ShowAllPosts",
  props: {
    btnClicked: String
  },
  data() {
    return {};
  },
 watch: {
    btnClicked() {
      const btn = document.getElementById('show-all-posts')
      if (this.btnClicked !== 'show-all-posts') {
        btn.classList = 'btn btn-light' 
      } 
    }
  },
  methods: {
    showAllPosts: function() {
      const btn = document.getElementById('show-all-posts')
      btn.classList = 'btn btn-success' 
      this.$emit('reload', 'show-all-posts');
    }
  }
};
</script>
