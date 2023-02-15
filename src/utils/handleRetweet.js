import { RETWEET_COLLECTION, TWEET_COLLECTION } from "../firebase";
import store from "../store";
import firebase from "firebase";

export default (tweet) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = RETWEET_COLLECTION.doc();
      await doc.set({
        id: doc.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        created_at: Date.now(),
      });

      await TWEET_COLLECTION.doc(tweet.id).update({
        num_retweets: firebase.firestore.FieldValue.increment(1),
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
