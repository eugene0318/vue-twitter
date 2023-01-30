<template lang="">
  <!--main section-->
  <div class="flex-1 border-r border-gray-100 overflow-y-auto">
    <div class="flex flex-col">
      <!--page title -->
      <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">
        home
      </div>
      <!--tweeting section-->
      <div class="flex px-3 py-3 border-b-8 border-gray-100">
        <img
          src="http://picsum.photos/200"
          class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
        />
        <div class="ml-2 flex-1 flex flex-col">
          <textarea
            placeholder="무슨 일이 일어나고 있나요."
            class="w-full text-lg font-bold focus:outline-none mb-3 resize-none"
          ></textarea>
          <div class="text-right">
            <button
              class="bg-primary hover:bg-dark text-sm font-bold text-white px-4 py-1 rounded-full"
            >
              트윗
            </button>
          </div>
        </div>
      </div>
      <!--tweets-->
      <div
        class="flex px-3 py-3 border-b border-gray-100"
        v-for="tweet in 10"
        :key="tweet"
      >
        <img
          src="http://picsum.photos/200"
          class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
        />
        <div class="ml-3 flex-1 flex flex-col space-y-1">
          <div class="text-sm space-x-1">
            <spna class="font-bold">엽천</spna>
            <spna class="text-gray-500 text-xs">@yeopcheon</spna>
            <span>·</span>
            <spna class="text-gray-500 text-xs">57분</spna>
          </div>
          <!--tweet body-->
          <div>진짜 이 날 코디 레전드다</div>
          <!--tweet actions-->
          <div class="flex justify-between">
            <div class="text-gray-500 hover:text-primary">
              <i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
              <span class="l-1 text-gray-500 text-sm">11</span>
            </div>
            <div class="text-gray-500 hover:text-green-500">
              <i class="far fa-retweet hover:bg-green-50 rounded-full p-2"></i>
              <span class="l-1 text-gray-500 text-sm">11</span>
            </div>
            <div class="text-gray-500 hover:text-red-500">
              <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
              <span class="l-1 text-gray-500 text-sm">11</span>
            </div>
            <div class="text-gray-500 hover:text-primary">
              <i
                class="far fa-share-square hover:bg-blue-50 rounded-full p-2"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--trend section-->
  <Trends />
</template>
<script>
import Trends from "../components/Trends.vue";
export default {
  components: {
    Trends,
  },
};
</script>
<style lang=""></style>
