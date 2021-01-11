<template>
  <div class="unread-posts-filter">

  <!-- show if unread posts -->
    <div v-if="unreadPostsNum>=1">
      <button id="unread-posts-num" @click.prevent="filterByUnread" class="btn btn-outline-primary border-0 mb-2 float-left">
      {{ unreadPostsNum }} unread
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
      </svg>
    </button>
    
    <!-- mark as read -->
    <b-button id="mark-all-as-read-btn" @click.prevent="markAllAsRead" class="ml-2 btn border-0 bg-light text-danger">
      <!-- icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">
        <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z"/>
      </svg>
    </b-button>
    </div>
    
      <!-- show if read -->
    <p v-else class="m-2 text-success">
      No posts to read
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
        <path d="M8.354 10.354l7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
      </svg>
    </p>   
  
  </div>
</template>

<script>
export default {
  name: "UnreadPostsFilter",
  props: {
    msg: String,
    userId: String,
    postArray: Array
},
 watch: {
   postArray() {
      this.updateUnreadNumber();
    }
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
          // this.$emit('unread-number', this.unreadPostsNum)
          this.filteredByUnread = this.postArray.filter(
            post => !post.users_read.includes(this.userId)
          );
        }
      }
    },
    filterByUnread() {
      const btn = document.getElementById('unread-posts-num')
      btn.classList = 'btn btn-primary' 
      this.$emit("reload", 'unread-posts-num');

      this.$emit("filter-by-unread", this.filteredByUnread);
    },
    markAllAsRead: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));

      const options = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      const request = await fetch(
        "http://localhost:5001/posts/markAllAsRead",
        options
      );
      const response = await request.json();
      if (response.error) {
        alert(response.error);
      } else {
        this.$emit('reload', {btnName: 'show-all-posts', alertMessage: 'No posts to read'})
      }
    }
  }
};
</script>
