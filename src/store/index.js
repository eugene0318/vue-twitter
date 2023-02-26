import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_BACKGROUND_IMAGE: (state, IMAGE) => {
      state.user.background_image_url = IMAGE;
    },
    SET_PROFILE_IMAGE: (state, IMAGE) => {
      state.user.profile_image_url = IMAGE;
    },
    SET_FOLLOW: (state, uid) => {
      state.user.followings.push(uid);
    },
    SET_UN_FOLLOW: (state, uid) => {
      state.user.followings = state.user.followings.filter((u) => u != uid);
    },
  },
  plugins: [createPersistedState()],
});

export default store;
