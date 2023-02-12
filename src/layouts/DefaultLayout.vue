<template>
  <div class="flex h-screen container mx-auto">
    <!-- side section-->
    <div
      class="w-20 xl:w-1/4 pt-5 xl:ml-10 flex flex-col justify-between border-r border-gray-100"
    >
      <div class="flex flex-col items-center xl:items-start">
        <!--twitter logo-->
        <i class="fa-brands fa-twitter text-2xl text-dark xl:ml-4 mb-3"></i>
        <!---sidemenu icons-->
        <div class="flex flex-col items-start">
          <router-link
            :to="route.path"
            :class="`hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer ${
              router.currentRoute.value.name == route.name
            }`"
            v-for="route in routes"
            :key="route"
          >
            <div v-if="route.meta.isMenu">
              <i :class="route.icon"></i>
              <span class="ml-5 text-xl hidden xl:inline-block">{{
                route.title
              }}</span>
            </div>
          </router-link>
        </div>
        <!--twit button-->
        <div class="w-full xl:pr-3">
          <button
            class="mt-3 bg-primary text-white xl:w-full w-12 h-12 rounded-full hover:bg-dark"
          >
            <span class="hidden xl:block">트윗</span>
            <i class="fas fa-plus xl:hidden"></i>
          </button>
        </div>
      </div>
      <!--profile button-->
      <div class="xl:pr-3 mb-3" @click="showProfileDropdown = true">
        <button
          class="hidden xl:flex mt-3 px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 justify-center"
        >
          <img
            :src="uer.profile_image_url"
            class="w-10 h-10 rounded-full"
            alt=""
          />
          <div class="xl:ml-2 hidden xl:block ml-2">
            <div class="text-sm font-bold">eugene.comm</div>
            <div class="text-xs text-gray-500 text-left">@eugene_jade</div>
          </div>
          <i class="ml-auto fa-solid fa-ellipsis-h fa-fw text-xs"></i>
        </button>
        <div class="xl:hidden flex justify-center">
          <img
            src="http://picsum.photos/100"
            class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
            alt=""
          />
        </div>
      </div>
    </div>
    <!--main section-->
    <div class="flex-1 flex h-screen"><router-view /></div>
    <!--profile dropdown menu-->

    <div
      class="absolute bottom-20 left-14 shadow rounded-lg w-40 bg-white"
      v-if="showProfileDropdown"
    >
      <button
        class="hover:bg-gray-50 border-b border-gray-100 flex p-3 w-full items-center"
      >
        <img src="http://picsum.photos/200" class="w-10 n-10 rounded-full" />
        <div class="ml-2">
          <div class="fontb-bod text-sm">{{ currentUser.email }}</div>
          <div class="text-left text-gray-500 text-sm">
            @{{ currentUser.username }}
          </div>
          <i class="fas fa-check text-primary ml-auto"></i>
        </div>
      </button>
      <button
        class="hover:bg-gray-50 w-full text-left text-sm"
        @click="onLogOut"
      >
        @{{ currentUser.username }}에서 로그아웃
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import router from "../router";
import { auth } from "../firebase";
import store from "../store";
import { log } from "console";
// import Messages from "./pages/Messages.vue";
// import Home from "./pages/Home.vue";
//mport Profile from "./pages/Profile.vue";
export default {
  components: {},
  setup() {
    const routes = ref([]);
    const showProfileDropdown = ref(false);

    const currentUser = computed(() => store.state.user);

    const onLogOut = async () => {
      await auth.signOut();
      store.commit("SET_USER", null);
      await router.replace("/login");
    };
    onBeforeMount(() => {
      routes.value = router.options.routes.filter(
        (route) => route.meta.isMenu == true
      );
      //console.log(router.currentRoute.value);
    });
    return { routes, showProfileDropdown, onLogOut, currentUser, router };
  },
};
</script>

<style></style>
