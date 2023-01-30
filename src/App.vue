<template>
  <div class="flex h-screen container mx-auto">
    <!-- side section-->
    <div
      class="w-20 lg:w-1/4 pt-5 lg:ml-10 flex flex-col justify-between border-r border-gray-100"
    >
      <div class="flex flex-col items-center lg:items-start">
        <!--twitter logo-->
        <i class="fa-brands fa-twitter text-2xl text-dark lg:ml-4 mb-3"></i>
        <!---sidemenu icons-->
        <div class="flex flex-col items-start">
          <div
            class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-house fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">홈</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-hashtag fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">탐색하기</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-bell fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">알림</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-envelope fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">쪽지</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-bookmark fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">북마크</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-list-alt fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">리스트</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-user fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">프로필</span>
          </div>
          <div
            class="hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
          >
            <i class="fa-solid fa-ellipsis-h fa-fw text-2xl"></i>
            <span class="ml-5 text-lg hidden lg:inline-block">더보기</span>
          </div>
        </div>
        <!--twit button-->
        <div class="w-full lg:pr-3">
          <button
            class="mt-3 bg-primary text-white lg:w-full w-12 h-12 rounded-full hover:bg-dark"
          >
            <span class="hidden lg:block">트윗</span>
            <i class="fas fa-plus lg:hidden"></i>
          </button>
        </div>
      </div>
      <!--profile button-->
      <div class="lg:pr-3 mb-3">
        <button
          class="hidden lg:flex mt-3 px-2 py-1 w-full h-12 rounded-full hover:bg-blue-50 justify-center"
        >
          <img
            src="http://picsum.photos/100"
            class="w-10 h-10 rounded-full"
            alt=""
          />
          <div class="lg:ml-2 hidden lg:block ml-2">
            <div class="text-sm font-bold">eugene.comm</div>
            <div class="text-xs text-gray-500 text-left">@eugene_jade</div>
          </div>
          <i class="ml-auto fa-solid fa-ellipsis-h fa-fw text-xs"></i>
        </button>
        <div class="lg:hidden flex justify-center">
          <img
            src="http://picsum.photos/100"
            class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
            alt=""
          />
        </div>
      </div>
    </div>
    <!--main section-->
    <div class="flex-1">
      <div class="flex h-screen"><Notification /><Trends /></div>
    </div>
  </div>
</template>

<script>
import Notification from "./pages/Notification.vue";
import Home from "./pages/Home.vue";
import Trends from "./components/Trends.vue";
export default {
  components: {
    Home,
    Notification,
    Trends,
  },
  setup() {},
};
</script>

<style></style>
