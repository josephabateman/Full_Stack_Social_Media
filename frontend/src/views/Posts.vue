<template>
  <div class="posts">
    <b-container class="bv-example-row" id="container">
      <!-- alert on success -->
      <b-alert
        class="p-3 mb-3 mt-3"
        :show="dismissCountDown"
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p>{{ alertMessage }}</p>

        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>

      <!-- left sidebar -->
      <b-row>
        <b-col cols="md-3" class="p-3 shadow-sm bg-white rounded">
          <b-row class="sticky-top">
            <UnreadPostsFilter
              class="p-md-4 float-left m-2"
              :userId="userId"
              :postArray="posts"
              :btnClicked="btnClicked"
              v-on:reload="reload"
              v-on:filter-by-unread="filterByUnread"
            />
            <ShowAllPosts
              class="p-md-4 float-left m-2"
              v-on:reload="reload"
              :btnClicked="btnClicked"
            />
            <CreatePost class="p-md-4 float-left m-2" v-on:reload="reload" />
            <GetUserPosts
              class="p-md-4 float-left m-2 d-none d-md-block"
              v-on:get-user-posts="displayUserPosts"
              :btnClicked="btnClicked"
            />
          </b-row>
        </b-col>

        <b-col>
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
              <PostComment
                class="mt-2 mb-3"
                :postId="post.post_id"
                v-on:reload="reload"
              />

              <!-- inner loop that prints comments  -->

              <b-container
                class="card w-100 mt-3 shadow-sm bg-white rounded"
                id="comments"
                v-for="comment in post.comments
                  .slice(limitCommentNumber)
                  .reverse()"
                :key="comment.commentId"
              >
                <b-row class="p-2">
                  <b-col md="4">
                    <p class="text-left font-italic">
                      {{ comment.firstName }} {{ comment.lastName }}
                    </p>
                  </b-col>
                  <b-col>
                    <p class="text-left">{{ comment.comment }}</p>
                  </b-col>
                  <!-- comment delete button (this is inside the nested loop) -->
                  <DeleteComment
                    v-if="userId === comment.userId"
                    :commentId="comment.commentId"
                    :postArray="posts"
                    v-on:reload="reload"
                  />
                </b-row>
              </b-container>

              <div class="d-flex justify-content-center mt-3">
                <div class="p-2">
                  <b-button
                    :id="post.post_id"
                    variant="info"
                    class="btn-sm"
                    @click="displayGetOne"
                    >Expand post</b-button
                  >
                </div>
                <div v-if="userId === post.user_id" class="p-2">
                  <UserOptions :postId="post.post_id" v-on:reload="reload" />
                </div>
              </div>
            </div>
          </div>
          <!-- outside of loop -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from "@/components/main-post-area/CreatePost.vue";
import PostComment from "@/components/main-post-area/PostComment.vue";
import DeleteComment from "@/components/main-post-area/DeleteComment.vue";
import UnreadPostsFilter from "@/components/left-sidebar/UnreadPostsFilter.vue";
import UserOptions from "@/components/main-post-area/user-options/UserOptions.vue";
import GetUserPosts from "@/components/left-sidebar/GetUserPosts.vue";
import ShowAllPosts from "@/components/left-sidebar/ShowAllPosts.vue";

export default {
  name: "Posts",
  components: {
    CreatePost,
    UnreadPostsFilter,
    GetUserPosts,
    ShowAllPosts,
    PostComment,
    DeleteComment,
    UserOptions,
  },
  data() {
    return {
      posts: [],
      userId: "",
      postId: "",
      writeComment: "",
      modifyCaption: "",
      limitCommentNumber: -3,
      btnClicked: "",
      dismissSecs: 4,
      dismissCountDown: 0,
      alertMessage: "",
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
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch("http://localhost:5001", options);
      const jsonData = await response.json();

      this.posts = await jsonData;
      this.btnClicked = "show-all-posts";
    },
    reload(btn) {
      this.fetchPosts();
      this.writeComment = "";
      this.modifyCaption = "";
      this.btnClicked = btn.btnName;
      this.alertMessage = btn.alertMessage;
      this.showAlert();
    },
    displayUserPosts(payload) {
      this.posts = payload;
      this.btnClicked = "get-user-posts";
      this.alertMessage = "Showing user posts";
      this.showAlert();
    },
    filterByUnread(payload) {
      if (payload.length === 0) {
        alert("You have no unread posts");
      } else {
        this.posts = payload;
        this.alertMessage = "Filtered By unread";
        this.showAlert();
      }
    },
    displayGetOne() {
      const postId = event.target.id;
      this.$router.push({ name: "IndividualPost", query: { post: postId } });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
