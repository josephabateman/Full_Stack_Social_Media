<template>
  <div class="sidebar-left">
    <b-container>
      <b-row class="d-flex flex-row-reverse justify-content-left">

          <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
          >
            <p>Displaying unread posts</p>

            <b-progress
              variant="warning"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>

       <!-- show if unread posts -->
          <button v-if="unreadPostsNum>=1" @click.prevent="filterByUnread" class="m-2 btn btn-outline-primary">
            {{ unreadPostsNum }} unread
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
            </svg>
          </button>

            <!-- show if read -->
          <p v-else class="m-2 text-success">
            No posts to read
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
              <path d="M8.354 10.354l7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>
          </p>   

    <CreatePost class="mt-2" v-on:reload="reload" />
    <MarkAllAsRead class="m-2" v-on:reload="$emit('reload')" />
    <GetUserPosts class="m-2" v-on:get-user-posts="getUserPostsToGp" />
    <b-button class="m-2 btn btn-light" @click.prevent="$emit('reload')">Show all posts</b-button>
     
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MarkAllAsRead from "@/components/left-sidebar/MarkAllAsRead.vue";
import GetUserPosts from "@/components/left-sidebar/GetUserPosts.vue";
import CreatePost from "@/components/main-post-area/CreatePost.vue";

export default {
  name: "SideBarLeft",
  components: {
    MarkAllAsRead,
    GetUserPosts,
    CreatePost
  },
  data() {
    return {
      unreadPostsNum: 0,
      filteredByUnread: [],
      unreadButtonText: '',
      dismissSecs: 4,
      dismissCountDown: 0
    };
  },
  //inefficient to always watch this
  watch: {
    postArray() {
      this.updateUnreadNumber();
    }
  },
  props: {
    msg: String,
    userId: String,
    postArray: Array
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    getUserPostsToGp(payload) {
      //this is the parent - now go to gp
      this.$emit("get-user-posts-to-gp", payload);
    },

    updateUnreadNumber: function() {
      this.unreadPostsNum = 0;
      for (let post of this.postArray) {
        const usersReadArray = post.users_read;
        if (!usersReadArray.includes(this.userId)) {
          this.unreadPostsNum += 1;
          this.filteredByUnread = this.postArray.filter(
            post => !post.users_read.includes(this.userId)
          );
        }
      }
    },
    filterByUnread() {
      this.showAlert()
      this.$emit("filter-by-unread", this.filteredByUnread);
    }
  }
};
</script>
