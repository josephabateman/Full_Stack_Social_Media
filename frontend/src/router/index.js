import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/posts",
    name: "Posts",
    component: () =>
      import(/* webpackChunkName: "posts" */ "../views/Posts.vue")
  },
  {
    path: "/individual-post",
    name: "IndividualPost",
    component: () =>
      import(
        /* webpackChunkName: "individual-post" */ "../views/IndividualPost.vue"
      )
  },
  {
    path: "/my-account",
    name: "MyAccount",
    component: () =>
      import(/* webpackChunkName: "my-account" */ "../views/MyAccount.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
