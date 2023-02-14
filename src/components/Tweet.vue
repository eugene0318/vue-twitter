<template lang="">
  <div class="flex-1 flex">
    <div class="flex-1 border-r border-gray-100">
      <div class="flex flex-col" v-if="tweet">
        <!-- title -->
        <div class="flex items-center px-3 py-2 border-b border-gray-100">
          <button @click="router.go(-1)">
            <i
              class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 rounded-full h-10 w-10"
            ></i>
          </button>
          <span class="font-bold text-lg ml-6">트윗</span>
        </div>
        <!-- tweet -->
        <div class="px-3 py-2 flex">
          <img
            :src="tweet.profile_image_url"
            class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
          />
          <div class="ml-2">
            <div class="font-bold">{{ tweet.email }}</div>
            <div class="text-gray text-sm">@{{ tweet.username }}</div>
          </div>
        </div>
        <div class="px-3 py-2">{{ tweet.tweet_body }}</div>
        <div class="px-3 py-2 text-gray text-xs">
          {{ moment(tweet.created_at).fromNow() }}
        </div>
        <div class="h-px w-full bg-gray-100"></div>
        <div class="flex space-x-2 px-3 py-2 items-center">
          <span class="">{{ tweet.num_retweets }}</span>
          <span class="text-sm text-gray">리트윗</span>
          <span class="ml-5">{{ tweet.num_likes }}</span>
          <span class="text-sm text-gray">마음에 들어요</span>
        </div>
        <div class="h-px w-full bg-gray-100"></div>
        <!-- buttons -->
        <div class="flex justify-around py-2">
          <button @click="showCommentModal = true">
            <i
              class="far fa-comment text-gray-400 text-xl hover:bg-blue-50 hover:text-primary p-2 rounded-full h-10 w-10"
            ></i>
          </button>
          <button @click="handleRetweet(tweet)">
            <i
              v-if="tweet.isRetweeted"
              class="fas fa-retweet text-xl hover:bg-green-50 text-green-400 p-2 rounded-full h-10 w-10"
            ></i>
            <i
              v-else
              class="fas fa-retweet text-gray-400 text-xl hover:bg-green-50 hover:text-green-400 p-2 rounded-full h-10 w-10"
            ></i>
          </button>
          <button @click="handleLikes(tweet)">
            <i
              v-if="tweet.isLiked"
              class="far fa-heart text-xl hover:bg-red-50 text-red-400 p-2 rounded-full h-10 w-10"
            ></i>
            <i
              v-else
              class="far fa-heart text-gray-400 text-xl hover:bg-red-50 hover:text-red-400 p-2 rounded-full h-10 w-10"
            ></i>
          </button>
        </div>
        <div class="h-px w-full bg-gray-100"></div>
        <!-- comments -->
        <div
          v-for="comment in comments"
          :key="comment"
          class="flex hover:bg-gray-50 cursor-pointer px-3 py-3 border-b border-gray-100"
        >
          <img
            :src="comment.profile_image_url"
            class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
          />
          <div class="ml-2 flex-1">
            <div class="flex items-center space-x-2">
              <span class="font-bold">{{ comment.email }}</span>
              <span class="text-gray text-sm">@{{ comment.username }}</span>
              <span>{{ moment(comment.created_at).fromNow() }}</span>
            </div>
            <div>{{ comment.comment_tweet_body }}</div>
          </div>
          <button
            @click="handleDeleteComment(comment)"
            v-if="comment.uid === currentUser.uid"
          >
            <i
              class="fas fa-trash text-red-400 hover:bg-red-50 w-10 h-10 rounded-full p-2"
            ></i>
          </button>
        </div>
      </div>
    </div>
    <trends></trends>
    <comment-modal
      :tweet="tweet"
      v-if="showCommentModal"
      @close-modal="showCommentModal = false"
    ></comment-modal>
  </div>
</template>
<script>
import moment from "moment";
import { ref } from "vue";
import CommentModal from "./CommentModal.vue";
import handleRetweet from "../utils/handleRetweet";
import handleLikes from "../utils/handleLikes";
import {
  COMMENT_COLLECTION,
  LIKE_COLLECTION,
  RETWEET_COLLECTION,
  TWEET_COLEECTION,
  USER_COLEECTION,
} from "../firebase";
import firebase from "firebase";
export default {
  components: { CommentModal },
  props: ["currentUser", "tweet"],
  setup() {
    const showCommentModal = ref(false);

    const onDeleteTweet = async (tweet) => {
      if (confirm("정말로 트윗을 삭제하시겠습니까?")) {
        // delete tweet
        await TWEET_COLEECTION.doc(tweet.id).delete();
        // delete comments
        const commentSnapshot = await COMMENT_COLLECTION.where(
          "from_tweet_id",
          "==",
          tweet.id
        ).get();
        commentSnapshot.docs.forEach(async (doc) => await doc.ref.delete());
        // delete likes
        const likeSnapshot = await LIKE_COLLECTION.where(
          "from_tweet_id",
          "==",
          tweet.id
        ).get();
        likeSnapshot.docs.forEach(async (doc) => await doc.ref.delete());
        // delete retweets
        const retweetCollection = await RETWEET_COLLECTION.where(
          "from_tweet_id",
          "==",
          tweet.id
        ).get();
        retweetCollection.docs.forEach(async (doc) => await doc.ref.delete());
        // user collection - num_tweets (-1)
        await USER_COLEECTION.doc(tweet.uid).update({
          num_tweets: firebase.firestore.FieldValue.increment(-1),
        });
      }
    };

    return {
      moment,
      showCommentModal,
      handleLikes,
      handleRetweet,
      onDeleteTweet,
    };
  },
};
</script>

<style></style>
