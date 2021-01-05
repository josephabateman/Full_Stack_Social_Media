import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

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
    path: "/parent-posts-display",
    name: "ParentPostsDisplay",
    component: () =>
      import(/* webpackChunkName: "parent-posts-display" */ "../views/ParentPostsDisplay.vue")
  },
  {
    path: "/my-account",
    name: "MyAccount",
    component: () =>
      import(/* webpackChunkName: "my-account" */ "../views/MyAccount.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
