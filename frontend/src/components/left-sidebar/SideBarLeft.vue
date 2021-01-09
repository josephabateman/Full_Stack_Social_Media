<template>
  <div class="sidebar-left">
    <b-container>
      <b-row class="d-flex flex-row-reverse justify-content-left">

    <button v-if="unreadPostsNum>=1" @click.prevent="filterByUnread" class="m-2 btn btn-outline-primary">
      {{ unreadPostsNum }} unread
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
      </svg>
    </button>

    <p v-else class="m-2 text-success">
      No posts to read
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
        <path d="M8.354 10.354l7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
      </svg>
    </p>

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

export default {
  name: "SideBarLeft",
  components: {
    MarkAllAsRead,
    GetUserPosts
  },
  data() {
    return {
      unreadPostsNum: 0,
      filteredByUnread: [],
      unreadButtonText: ''
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
      this.$emit("filter-by-unread", this.filteredByUnread);
    }
  }
};
</script>
