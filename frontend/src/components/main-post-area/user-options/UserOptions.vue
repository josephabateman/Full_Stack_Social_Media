<template>
  <div class="user-options">

  <div>
    <b-button class="btn-sm" v-b-modal.:id="postId" variant="info">User Options</b-button>
    <b-modal :id="postId" size="sm" title="User options" ok-only ok-title="never mind">
      <ModifyPost :postId="postId" v-on:reload="closeModal" class="mb-3" />
      <DeletePost :postId="postId" v-on:reload="closeModal" />
    </b-modal>
  </div>

  </div>
</template>

<script>
import ModifyPost from "@/components/main-post-area/user-options/ModifyPost.vue";
import DeletePost from "@/components/main-post-area/user-options/DeletePost.vue";

export default {
  name: "UserOptions",
  components: {
    ModifyPost,
    DeletePost
  },
  props: {
    msg: String,
    postId: String
  },
  data() {
    return {
      caption: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit('reload')
      this.$root.$emit('bv::hide::modal', this.postId)
    }
  }
};
</script>
