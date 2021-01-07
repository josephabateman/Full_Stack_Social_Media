<template>
  <div class="parent-posts-display">
    <SideBarLeft
      :userId="userId"
      :postArray="posts"
      v-on:reload="reload"
      v-on:get-user-posts-to-gp="displayUserPosts"
      v-on:filter-by-unread="filterByUnread"
      v-on:filtered-by-unread="filterByUnread"
      msg="sidebar left"
    />

    <div
      id="get-posts-loop"
      v-for="post in posts"
      :key="post.post_id"
      class="card mt-5 bg-light border-0"
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
        <PostComment :postId="post.post_id" v-on:reload="reload" />

        <!-- inner loop that prints comments  -->
        <div
          v-for="comment in post.comments"
          :key="comment.commentId"
          class="card"
        >
          <p>
            {{ comment.firstName }} {{ comment.lastName }}:
            {{ comment.comment }}
          </p>

          <!-- comment delete button (this is inside the nested loop) -->
          <DeleteComment
            :commentId="comment.commentId"
            :postArray="posts"
            v-on:reload="reload"
          />
        </div>

        <ModifyPost
          :postId="post.post_id"
          v-on:reload="reload"
          msg="modify post"
        />
        <DeletePost :postId="post.post_id" v-on:reload="reload" />

        <!-- v-if="userId === post.userId" -->
      </div>

      <GetOne
        :postId="post.post_id"
        v-on:reload="reload"
        v-on:fetch-one-response="displayGetOne"
      />
    </div>

    <!-- outside of loop -->
    <CreatePost :postId="postId" v-on:reload="reload" msg="create post" />
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from "@/components/main-post-area/CreatePost.vue";
import GetOne from "@/components/main-post-area/GetOne.vue";
import PostComment from "@/components/main-post-area/PostComment.vue";
import DeleteComment from "@/components/main-post-area/DeleteComment.vue";
import SideBarLeft from "@/components/left-sidebar/SideBarLeft.vue";
import DeletePost from "@/components/main-post-area/DeletePost.vue";
import ModifyPost from "@/components/main-post-area/ModifyPost.vue";

export default {
  name: "ParentPostsDisplay",
  //do i need to export all these?
  components: {
    CreatePost,
    GetOne,
    SideBarLeft,
    PostComment,
    DeleteComment,
    DeletePost,
    ModifyPost
  },
  data() {
    return {
      posts: [],
      userId: "",
      postId: "",
      writeComment: "",
      modifyCaption: ""
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
    },
    displayUserPosts(payload) {
      this.posts = payload;
    },
    filterByUnread(payload) {
      console.log("filtered by unread");
      // would be more efficient to just get by index than an array
      this.posts = payload;
    },
    displayGetOne(payload) {
      this.posts = payload;
    }
  }
};
</script>
