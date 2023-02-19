<template>
  <!-- tweets -->
  <div
    class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
  >
    <router-link :to="`/profile/${tweet.uid}`">
      <img
        :src="tweet.profile_image_url"
        class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
      />
    </router-link>
    <div class="ml-3 flex-1 flex flex-col space-y-1">
      <div class="text-sm flex justify-between items-center">
        <div class="space-x-1">
          <span class="font-bold">{{ tweet.email }}</span>
          <span class="text-gray-500 text-xs">@{{ tweet.username }}</span>
          <span>·</span>
          <span class="text-gray-500 text-xs">{{
            moment(tweet.created_at).fromNow()
          }}</span>
        </div>
        <button
          v-if="currentUser.uid === tweet.uid"
          @click="onDeleteTweet(tweet)"
        >
          <i
            class="fas fa-trash text-red-400 p-2 rounded-full hover:bg-red-50"
          ></i>
        </button>
      </div>
      <!-- tweet body -->
      <router-link :to="`/tweet/${tweet.id}`">{{
        tweet.tweet_body
      }}</router-link>
      <!-- tweet actions -->
      <div class="flex justify-between">
        <!-- comment button -->
        <div
          @click="showCommentModal = true"
          class="text-gray-500 hover:text-primary"
        >
          <i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_comments }}</span>
        </div>
        <!-- retweet button -->
        <div
          v-if="!tweet.isRetweeted"
          class="text-gray-500 hover:text-green-400"
          @click="handleRetweet(tweet)"
        >
          <i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
        </div>
        <div v-else class="text-green-400" @click="handleRetweet(tweet)">
          <i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
        </div>
        <!-- like button -->
        <div
          v-if="!tweet.isLiked"
          class="text-gray-400 hover:text-red-400"
          @click="handleLikes(tweet)"
        >
          <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
        </div>
        <div v-else class="text-red-400" @click="handleLikes(tweet)">
          <i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
          <span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
        </div>
        <!-- share button -->
        <div class="text-gray-500 hover:text-primary">
          <i class="far fa-share-square hover:bg-blue-50 rounded-full p-2"></i>
        </div>
      </div>
    </div>
    <comment-modal
      :tweet="tweet"
      v-if="showCommentModal"
      @close-modal="showCommentModal = false"
    ></comment-modal>
  </div>
</template>

<script>
import Trends from "../components/Trends.vue";
import router from "../router";
import { onBeforeMount, ref, computed } from "vue";
import store from "../store";
import { COMMENT_COLLECTION, TWEET_COLEECTION } from "../firebase";
import { useRoute } from "vue-router";
import getTweetInfo from "../utils/getTweetInfo";
import moment from "moment";
import CommentModal from "../components/CommentModal.vue";
import handleRetweet from "../utils/handleRetweet";
import handleLikes from "../utils/handleLikes";
import firebase from "firebase";

export default {
  components: { Trends, CommentModal },
  setup() {
    const tweet = ref(null);
    const comments = ref([]);
    const currentUser = computed(() => store.state.user);
    const showCommentModal = ref(false);

    const route = useRoute();

    const handleDeleteComment = async (comment) => {
      if (confirm("커멘트를 삭제하시겠습니까?")) {
        // delete comment
        await COMMENT_COLLECTION.doc(comment.id).delete();
        // decrease tweet num comments
        await TWEET_COLEECTION.doc(comment.from_tweet_id).update({
          num_comments: firebase.firestore.FieldValue.increment(-1),
        });
      }
    };

    onBeforeMount(async () => {
      await TWEET_COLEECTION.doc(route.params.id).onSnapshot(async (doc) => {
        const t = await getTweetInfo(doc.data(), currentUser.value);
        tweet.value = t;
      });

      COMMENT_COLLECTION.where("from_tweet_id", "==", route.params.id)
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            let comment = await getTweetInfo(
              change.doc.data(),
              currentUser.value
            );

            if (change.type === "added") {
              comments.value.splice(change.newIndex, 0, comment);
            } else if (change.type === "modified") {
              comments.value.splice(change.oldIndex, 1, comment);
            } else if (change.type === "removed") {
              comments.value.splice(change.oldIndex, 1);
            }
          });
        });
    });
    return {
      router,
      tweet,
      comments,
      currentUser,
      moment,
      showCommentModal,
      handleRetweet,
      handleLikes,
      handleDeleteComment,
    };
  },
};
</script>

<style></style>
