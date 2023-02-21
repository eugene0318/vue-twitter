import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Notifications from "../pages/Notifications.vue";
import Messages from "../pages/Messages.vue";
import Profile from "../pages/Profile.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import store from "../store";
import Tweet from "../pages/component/Tweet.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    title: "홈",
    icon: "fas fa-home fa-fw text-2xl",
    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/",
    name: "explore",
    component: Home,
    title: "탐색하기",
    icon: "fa-solid fa-hashtag fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notifications,
    title: "알림",
    icon: "fa-solid fa-bell fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/messages",
    name: "messages",
    component: Messages,
    title: "쪽지",
    icon: "fa-solid fa-envelope fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/bookmarks",
    name: "bookmarks",
    component: Messages,
    title: "북마크",
    icon: "fa-solid fa-bookmark fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/list",

    name: "list",
    component: Messages,
    title: "리스트",
    icon: "fa-solid fa-list-alt fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },

  {
    path: "/profile",
    name: "profile",
    component: Profile,
    title: "프로필",
    icon: "fa-solid fa-user fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/profile/:uid",
    component: Profile,
    icon: "fa-solid fa-user fa-fw text-2xl",

    meta: { isMenu: false, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/more",
    name: "more",
    component: Profile,
    title: "더보기",
    icon: "fa-solid fa-ellipsis-h fa-fw text-2xl",

    meta: { isMenu: true, layout: "DefaultLayout", requireAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { isMenu: false, layout: "EmptyLayout", requireAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isMenu: false, layout: "EmptyLayout", requireAuth: true },
  },
  {
    path: "/tweet/:id",
    name: "tweet",
    component: Tweet,
    title: "더보기",
    meta: { isMenu: false, layout: "DefaultLayout", requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  //router.push('/')
  const currentUser = store.state.user;
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  if (requireAuth && !currentUser) next("/login");
  else next();
});

export default router;

{
  /* <router-link
            to="/"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-hashtag fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">탐색하기</span>
          </router-link>
          <router-link
            to="/notifications"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-bell fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">알림</span>
          </router-link>
          <router-link
            to="/messages"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-envelope fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">쪽지</span>
          </router-link>
          <router-link
            to="/"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-bookmark fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">북마크</span>
          </router-link>
          <router-link
            to="/"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-list-alt fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">리스트</span>
          </router-link>
          <router-link
            to="/profile"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-user fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">프로필</span>
          </router-link>
          <router-link
            to="/"
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-ellipsis-h fa-fw text-2xl"></i>
            <span class="ml-5 text-xl hidden xl:inline-block">더보기</span>
          </router-link> */
}
