<template>
  <div class="parent-posts-display">

<b-container class="bv-example-row">
  <b-row>
    <b-col cols="3" class="d-none d-md-block">
      <SideBarLeft
      class="sticky-top p-3 shadow-sm bg-white rounded"
      :userId="userId"
      :postArray="posts"
      v-on:reload="reload"
      v-on:get-user-posts-to-gp="displayUserPosts"
      v-on:filter-by-unread="filterByUnread"
    />
    </b-col>

    <b-col>  
      <!-- <b-col class="d-md-none d-flex justify-content-center">
      
    </b-col> -->

      <div class="d-flex flex-row-reverse shadow-sm p-3 mb-5 bg-white rounded">
        <div class="p-2"><CreatePost :postId="postId" v-on:reload="reload" /></div>
        <div class="p-2"><Logout v-on:show-not-logged-in-nav="$emit('show-not-logged-in-nav')" /></div>
      </div>

      <SideBarLeft
          class="d-md-none"
          :userId="userId"
          :postArray="posts"
          v-on:reload="reload"
          v-on:get-user-posts-to-gp="displayUserPosts"
          v-on:filter-by-unread="filterByUnread"
        />
    
      <div
      id="get-posts-loop"
      v-for="post in posts"
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

      <div :id="post.post_id">

      <PostComment class="mt-2 mb-3" :postId="post.post_id" v-on:reload="reload" />

        <!-- inner loop that prints comments  -->

       
        <b-container class="card w-100 mt-3 shadow-sm bg-white rounded" id="comments"
          v-for="comment in post.comments.slice(limitCommentNumber).reverse()"
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
            <DeleteComment v-if="userId === comment.userId" :commentId="comment.commentId" :postArray="posts" v-on:reload="reload" />
          </b-row>
        </b-container>

        <div class="d-flex justify-content-center mt-3">
            <div class="p-2"><GetOne :postId="post.post_id" v-on:reload="reload" v-on:fetch-one-response="displayGetOne" /></div>
            <div v-if="userId === post.user_id" class="p-2"><UserOptions :postId="post.post_id" v-on:reload="reload" /></div>
        </div>
        
      </div>

    </div>
    <button @click.prevent="sortPosts">time stamp</button>
    <!-- outside of loop -->

    </b-col>
  </b-row>
</b-container>

  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from "@/components/main-post-area/CreatePost.vue";
import Logout from "@/components/main-post-area/Logout.vue";
import GetOne from "@/components/main-post-area/GetOne.vue";
import PostComment from "@/components/main-post-area/PostComment.vue";
import DeleteComment from "@/components/main-post-area/DeleteComment.vue";
import SideBarLeft from "@/components/left-sidebar/SideBarLeft.vue";
// import DeletePost from "@/components/main-post-area/DeletePost.vue";
// import ModifyPost from "@/components/main-post-area/ModifyPost.vue";
import UserOptions from "@/components/main-post-area/user-options/UserOptions.vue";


export default {
  name: "ParentPostsDisplay",
  //do i need to export all these?
  components: {
    CreatePost,
    Logout,
    GetOne,
    SideBarLeft,
    PostComment,
    DeleteComment,
    UserOptions
    // DeletePost,
    // ModifyPost
  },
  data() {
    return {
      posts: [],
      userId: "",
      postId: "",
      writeComment: "",
      modifyCaption: "",
      limitCommentNumber: -3
    };
  },
  mounted() {
    this.fetchPosts();
    this.userId = JSON.parse(sessionStorage.getItem("userId"));
  },
  methods: {
    fetchPosts: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await fetch("http://localhost:5001", options);
      const jsonData = await response.json();
      
      this.posts = await jsonData;
    },
    reload() {
      this.fetchPosts();
      this.writeComment = ""
      this.modifyCaption = ""
    },
    displayUserPosts(payload) {
      this.posts = payload;
    },
    filterByUnread(payload) {
      if (payload.length === 0) {
        alert('You have no unread posts')
      }
      this.posts = payload;
    },
    displayGetOne(payload) {
      this.posts = payload;
      this.limitCommentNumber = 0
    }
  }
};
</script>
