<template lang="">
  <div class="flex-1 flex">
    <!--profile section-->
    <div class="flex-1 flex flex-col border-color">
      <!--title-->
      <div class="px-3 py-1 flex border-b border-color">
        <button class="mr-r" @click="router.go(-1)">
          <i
            class="fas fa-arrow-left text-primary p-3 rounded-full hover:bg-blue-50"
          ></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">{{ profileUser.username }}</div>
          <div class="text-xs text-gray">{{ (profileUser, num_tweets) }}</div>
        </div>
      </div>
      <!--background image-->
      <div class="bg-gray-200 h-48 relative flex-none">
        <img
          :src="profileUser.background_img_url"
          class="w-full h-48 object-cover"
        />>
        <!--profile image-->
        <div
          class="border-4 w-28 h-28 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14"
        >
          <img
            :src="profileUser.profile_image_url"
            class="w-full h-full rounded-full opacity-90 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
      <!--profile edit button-->
      <div class="text-right mt-2 mr-2 h-14 relative">
        <div v-if="currentUser.uid == profileUser.uid">
          <button
            @click="showProfileEditModal = true"
            class="border-2 text-sm border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
          >
            프로필 수정
          </button>
        </div>
        <div v-else>
          <div
            v-if="currentUser.followings.includes(profileUser.uid)"
            @click="onUnFollow"
          >
            <button
              class="absolute w-24 right-0 text-sm bg-primary text-white px-3 py-2 hover:opacity-0 font-bold rounded-full"
            >
              팔로잉
            </button>
            <button
              class="absolute w-24 right-0 border-2 text-sm bg-red-400 border-primary text-primary px-3 py-2 opacity-0 hover:opacity-100 hover:bg-blue-50 font-bold rounded-full"
            >
              언팔로우
            </button>
          </div>
          <div v-else @click="onFollow">
            <button
              class="absolute right-0 border-2 text-sm border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
            >
              프로필 수정
            </button>
          </div>
        </div>
      </div>
      <!--user info-->
      <div class="mx-3 mt-2">
        <div class="font-extrabold text-lg">eugene</div>
        <div class="text-gray">@eugene</div>
        <div>
          <span class="text-gray">가입일 </span>
          <span class="text-gray">{{ moment(profileUser.created_at) }}</span>
        </div>
        <div>
          <span class="text-bold mr-1">{{ profileUser.followings.lngth }}</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="text-bold mr-1">{{
            profileUser.followings.length
          }}</span>
          <span class="text-gray">팔로워</span>
        </div>
      </div>
      <!--tabs-->
      <div class="flex border-b border-color">
        <div
          @click="currentTab = 'tweet'"
          :class="${currentTab == 'tweet' ? 'border-b border-primary text-primary':'text-gray'} py-3  font-bold text-center w-1/3 hover:text-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
        <div
          @click="currentTab = 'retweet'"
          :class="${currentTab == 'retweet' ? 'border-b border-primary text-primary':'text-gray'} py-3  font-bold text-center w-1/3 hover:text-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
        <div
          @click="currentTab = 'like'"
          :class="${currentTab == 'like' ? 'border-b border-primary text-primary':'text-gray'} py-3  font-bold text-center w-1/3 hover:text-blue-50 cursor-pointer hover:text-primary"
        >
          트윗
        </div>
      </div>
      <!--Tweet-->
      <div class="overflow-y-auto">
        <Tweet
          v-for="tweet in currentTab == 'tweet'
            ? tweets
            : currentTab == 'retweet'
            ? retweets
            : LikeTweets"
          :key="tweet"
          :profileUser="'profileUser'"
        />
      </div>
    </div>
    <!--trend section-->
    <Trends />
    <prorile-edit-modal
      v-if="showProfileEditModal"
      @close-modal="showProfileEditModal = false"
    ></prorile-edit-modal>
  </div>
</template>
<script>
import Tweet from "../components/Tweet.vue";
import Trends from "../components/Trends.vue";
import store from "../store";
import { Computed, ref } from "vuex";
import { computed, onBeforeMount } from "@vue/runtime-core";
import {
  LIKE_COLLECTION,
  RETWEET_COLLECTION,
  TWEET_COLLECTION,
  USER_COLLECTION,
} from "../firebase";
import firebase from "firebase";
import { useRoute } from "vue-router";
import router from "../router";
import ProfileEditModal from '../components/ProfileEditModal.vue'
export default {
  components: {
    Trends,
    Tweet,
    ProfileEditModal
  },
  setup() {
    const currentUser = computed(() => store.state.user);
    const profileUser = ref(null)
    const tweets = ref([]);
    const retweets = ref([]);
    const LikeTweets = ref([]);
    const currentTab = ref("tweet");
    const showProfileEditModal = ref(false)

    onBeforeMount(async () => {
      const profileUID = route.params.uid ? currentUser.value.uid;

      USER_COLLECTION.doc(profileUID).onSnapshot((doc)=>{
        profileUser.value = doc.data()
      })

      TWEET_COLLECTION.where("uid", "==", profileUID)
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            let tweet = await getTweetInfo(
              change.doc.data(),
              currentUser.value
            );

            if (change.type === "added") {
              tweets.value.splice(change.newIndex, 0, tweet);
            } else if (change.type === "modified") {
              tweets.value.splice(change.oldIndex, 1, tweet);
            } else if (change.type === "removed") {
              tweets.value.splice(change.oldIndex, 1);
            }
          });
        });

      RETWEET_COLLECTION.where("uid", "==", profileUID)
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            const doc = await TWEET_COLLECTION.doc(
              change.doc.data().from_tweet_id
            ).get();
            let tweet = await getTweetInfo(doc.data(), currentUser.value);

            if (change.type === "added") {
              retweets.value.splice(change.newIndex, 0, tweet);
            } else if (change.type === "modified") {
              retweets.value.splice(change.oldIndex, 1, tweet);
            } else if (change.type === "removed") {
              retweets.value.splice(change.oldIndex, 1);
            }
          });
        });

      LIKE_COLLECTION.where("uid", "==", profileUID)
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            let tweet = await getTweetInfo(
              change.doc.data(),
              currentUser.value
            );

            if (change.type === "added") {
              LikeTweets.value.splice(change.newIndex, 0, tweet);
            } else if (change.type === "modified") {
              LikeTweets.value.splice(change.oldIndex, 1, tweet);
            } else if (change.type === "removed") {
              LikeTweets.value.splice(change.oldIndex, 1);
            }
          });
        });
    });

    const onUnFollow =async() =>{
      await USER_COLLECTION.doc(currentUser.value.uid).update({
        followings : firebase.firestore.FieldValue.arrayUnion(profileUser.value.uid)
      })
      await USER_COLLECTION.doc(profileUser.value.uid).update({
        followers : firebase.firestore.FieldValue.arrayUnion(currentUser.value.uid)
      })

      store.commit("SET_FOLLOW", profileUser.value.uid)
    }

    const onUnFollow =async() =>{
      await USER_COLLECTION.doc(currentUser.value.uid).update({
        followings : firebase.firestore.FieldValue.arrayRemove(profileUser.value.uid)
      })
      await USER_COLLECTION.doc(profileUser.value.uid).update({
        followers : firebase.firestore.FieldValue.arrayRemove(currentUser.value.uid)
      })
    }

    return { onFollow,onUnFollow,showProfileEditModal,currentUser, router, tweets, currentTab, retweets, LikeTweets, profileUser };
  },
};
</script>
<style lang=""></style>
