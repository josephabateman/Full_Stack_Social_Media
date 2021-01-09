<template>

  <div class="get-one">

  <b-container class="bv-example-row">

  <b-row>

    <b-col>
      <div
        id="get-posts-loop"
        v-for="post in onePost"
        :key="post.post_id"
        class="card mt-5 border-0 shadow-lg p-3 mb-5 bg-white rounded"
      >

        <p id="convertedTime" class="p-2">{{ post.convertedTime }}</p>
        <h2 id="postCaption" class="p-2">{{ post.caption }}</h2>
        <img
          id="fileUploadImage"
          :src="post.file_upload"
          alt=""
          class="mx-auto d-block img-fluid width: 100%"
        />

        <PostComment class="mt-2 mb-3" :postId="post.post_id" v-on:reload="reload" />
        
          <div class="d-flex justify-content-center mt-3">
              <div v-if="userId === post.user_id" class="p-2"><UserOptions :postId="post.post_id" v-on:reload="reload" /></div>
          </div>
      </div>
    </b-col>
   
    <b-col cols="lg-5">
        <div v-for="post in onePost" :key="post.post_id">
          <b-container class="card w-100 mt-3 shadow-sm bg-white rounded" id="comments"
          v-for="comment in post.comments.slice(0).reverse()"
          :key="comment.commentId"
        >
          <b-row class="p-2">
            <b-col md="4">
              <p class="text-left font-italic">{{ comment.firstName }} {{ comment.lastName }}</p>
            </b-col>
            <b-col>
              <p class="text-left">{{ comment.comment }}</p>
            </b-col>
               <!-- comment delete button (this is inside the nested loop) -->
            <DeleteComment v-if="userId === comment.userId" :commentId="comment.commentId" :postArray="onePost" v-on:reload="reload" />
          </b-row>
        </b-container>
      </div>
    </b-col>

  </b-row>
  
  </b-container>

  </div>
</template>

<script>

// import CreatePost from "@/components/main-post-area/CreatePost.vue";
// import Logout from "@/components/main-post-area/Logout.vue";
import PostComment from "@/components/main-post-area/PostComment.vue";
import DeleteComment from "@/components/main-post-area/DeleteComment.vue";
import UserOptions from "@/components/main-post-area/user-options/UserOptions.vue";

export default {
  name: "GetOne",
  components: {
    // CreatePost,
    // Logout,
    PostComment,
    DeleteComment,
    UserOptions
    // DeletePost,
    // ModifyPost
  },
  props: {
    msg: String
  },
  data() {
    return {
      onePost: [],
      userId: '',
      postId: ''
    };
  },
  mounted() {
    this.userId = JSON.parse(sessionStorage.getItem("userId"));
    this.getOne()
  },
  methods: {
    getOne: async function() {

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.postId = urlParams.get('post')

      const token = JSON.parse(sessionStorage.getItem("jwt"));
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await fetch(`http://localhost:5001/${this.postId}`, options);
      const jsonDataFetchOne = await response.json();

      this.onePost = jsonDataFetchOne;
      // this.$emit("fetch-one-response", jsonDataFetchOne);
    },
    reload() {
      this.getOne();
      // this.writeComment = ""
      // this.modifyCaption = ""
    },
  }
};
</script>