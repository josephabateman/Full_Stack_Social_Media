<template>
  <div class="sidebar-left">
    <b-container>
      <b-row class="d-flex justify-content-left">

    <p class="mb-3 p-2 mb-3 bg-secondary text-white rounded" style="cursor:default">Unread Posts: {{ unreadPostsNum }}</p>
    <MarkAllAsRead class="mb-3" v-on:reload="$emit('reload')" />
    <GetUserPosts class="mb-3" v-on:get-user-posts="getUserPostsToGp" />
    <b-button class="mb-3 p-2" variant="outline-info" @click.prevent="filterByUnread">Unread Posts</b-button>
    <b-button class="mb-3" variant="outline-info" @click.prevent="$emit('reload')">Show all posts</b-button>
     
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
      filteredByUnread: []
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
