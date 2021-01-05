<template>
  <div class="sidebar-left">
    <h1>{{ msg }}</h1>
    
    <p>Unread Posts: {{ unreadPostsNum }}</p>

    <MarkAllAsRead v-on:reload="$emit('reload')" />

    <GetUserPosts v-on:get-user-posts="getUserPostsToGp" />
      
      <button @click.prevent="filterByUnread">Unread Posts</button>

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
      this.updateUnreadNumber()
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
        this.$emit('get-user-posts-to-gp', payload)
      },
     
      updateUnreadNumber: function() {
        this.unreadPostsNum = 0
        for (let post of this.postArray) {
          const usersReadArray = post.users_read 
            if (!usersReadArray.includes(this.userId)) {
              this.unreadPostsNum += 1 
              this.filteredByUnread = this.postArray.filter(post => !post.users_read.includes(this.userId));
            } 
        }
    },
    filterByUnread() {
      this.$emit('filtered-by-unread', this.filteredByUnread)
    },
  }
};
</script>