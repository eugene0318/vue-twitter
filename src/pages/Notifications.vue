<template lang="">
  <!--notifications---->
  <div class="flex-1 border-r border-gray-100 flex flex-col overflow-y-auto">
    <!--title-->
    <dic class="p-3 font-bold text-lg border-b border-gray-100">알림</dic>
    <!--notifications-->
    <div
      class="flex flex-col hover:bg-gray-50 p-3 space-y-2 border-b border-gray-100 cursor-pointer"
      v-for="notification in notifications"
      :key="notification"
    >
      <div class="flex justify-between">
        <router-link :to="`/profile/${notification.uid}`"
          ><img
            :src="notification.profile_image_url"
            class="w-10 h-10 rounded-full hover:opacity-80"
        /></router-link>

        <i
          class="fas fa-ellipsis-h text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-10 h-10 flex items-center justify-center"
        ></i>
      </div>
      <div>
        <span class="font-bold">{{ notification.username }}</span
        >님의 최근 트윗
      </div>
      <router-link :to="`/tweet/${notification.id}`"
        ><div class="text-gray-500">
          {{ notification.tweet_body }}
        </div></router-link
      >
    </div>
  </div>
  <!--trends-->
  <Trends />
</template>
<script>
import Trends from "../components/Trends.vue";
import { ref, computed, onBeforeMount } from "vue";
import store from "../store";
import { TWEET_COLLECTION } from "../firebase";
import getTweetInfo from "../utils/getTweetInfo";
export default {
  components: {
    Trends,
  },
  setup() {
    const currentUser = computed(() => store.state.user);
    const notification = ref([]);
    onBeforeMount(() => {
      currentUser.value.followings.forEach(async (following) => {
        const dateFrom = Date.now() - 60 * 60 * 24 * 7 * 1000;
        const snapshot = await TWEET_COLLECTION.where(
          "create_at",
          ">",
          dateFrom
        )
          .where("uid", "==", following)
          .orderBy("created_at", "desc")
          .get();
        snapshot.docs.forEach(async (dot) => {
          let tweet = await getTweetInfo(doc.data());
          notification.value.push(tweet);
        });
      });
    });

    return {
      currentUser,
    };
  },
};
</script>
<style lang=""></style>
