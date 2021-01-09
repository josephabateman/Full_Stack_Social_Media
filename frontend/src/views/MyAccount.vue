<template>
  <div class="my-account">
    <div class="container">
      <div class="row">
        <div class="col-md-8 d-flex justify-content-start">
          <UpdateUserDetails msg="" class="mb-3"/>
        </div>
        <div class="col-md-8 d-flex justify-content-start">
          <b-button @click.prevent="getUserPosts" variant="outline-info" class="mb-3">Show My Posts</b-button>
        </div>
        <div class="col-md-8 d-flex justify-content-start">
          <DeleteAccount msg="" />
        </div>
      </div>
    </div>

     <b-container class="bv-example-row">

  <b-row>

    <b-col>
      <div
        id="get-posts-loop"
        v-for="post in userPosts"
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

        <div class="d-flex justify-content-center mt-3">
          <div class="mr-2"><ModifyPost :postId="post.post_id" v-on:reload="reload" /></div>
          <div><DeletePost :postId="post.post_id" v-on:reload="reload" /></div>
        </div>

      <div v-for="post in userPosts" :key="post.post_id">
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
            <!-- <DeleteComment v-if="userId === comment.userId" :commentId="comment.commentId" /> -->
          </b-row>
        </b-container>
      </div>
          
          
      </div>
    </b-col>

  </b-row>
  
  </b-container>

  </div>
</template>

<script>
// @ is an alias to /src
import DeleteAccount from "@/components/account/DeleteAccount.vue";
import UpdateUserDetails from "@/components/account/UpdateUserDetails.vue";
import ModifyPost from "@/components/main-post-area/user-options/ModifyPost.vue";
import DeletePost from "@/components/main-post-area/user-options/DeletePost.vue";

export default {
  name: "MyAccount",
  components: {
    DeleteAccount,
    UpdateUserDetails,
    ModifyPost,
    DeletePost
  },
  data() {
    return {
      userPosts: [],
      userId: ''
    }
  },
   mounted() {
    this.userId = JSON.parse(sessionStorage.getItem("userId"));
  },
  methods: {
    reload() {
      this.getUserPosts()
    },
    getUserPosts: async function() {
      const token = JSON.parse(sessionStorage.getItem("jwt"));

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      //make more secure
      const response = await fetch(`http://localhost:5001/userId`, options);
      const jsonDataUserPosts = await response.json();
      if (jsonDataUserPosts.error) {
        alert(jsonDataUserPosts.error);
      }
      this.userPosts = jsonDataUserPosts;
    }
  }
};
</script>
