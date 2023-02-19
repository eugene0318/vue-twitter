import {
  RETWEET_COLLECTION,
  LIKES_COLLECTION,
  USER_COLLECTION,
} from "../firebase";
import { store } from "../store";
export default async (tweet, currentUser) => {
  //adding user info
  const doc = await USER_COLLECTION.doc(tweet.uid).get();
  tweet.profile_image_url = doc.data().profile_image_url;
  tweet.email = doc.data().email;
  tweet.username = doc.data().username;

  //tweet = { ...tweet };
  //adding retweet info
  const retweetSnapshot = await RETWEET_COLLECTION.where(
    "from_tweet_if",
    "==",
    tweet.id
  )
    .where("uid", "==", currentUser.uid)
    .get();
  if (retweetSnapshot.empty) {
    tweet.isRetweeted = false;
  } else {
    tweet.isRetweeted = true;
  }
  //adding likes info
  const likeSnapshot = await LIKES_COLLECTION.where(
    "from_tweet_if",
    "==",
    tweet.id
  )
    .where("uid", "==", currentUser.uid)
    .get();
  if (likeSnapshot.empty) {
    tweet.isLiked = false;
  } else {
    tweet.isLiked = true;
  }
  return tweet;
};
