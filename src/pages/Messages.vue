<template>
  <div class="flex-1 flex">
    <!--chat list-->
    <div class="w-2/5 border-r border-gray-100 overflow-y-scroll">
      <div class="flex flex-col">
        <div class="p-3 h-14 font-bold text-lg border-b border-gray-100">
          쪽지
        </div>
        <div
          class="flex px-3 py-4 hover:bg-gray-50 border-b border-gray-100 bg-gray-100"
        >
          <img
            src="http://picsum.photos/200/"
            class="w-10 h-10 rounded-full cursor-pointer mr-2"
          />
          <div>
            <dic class="flex space-x-1">
              <div class="font-bold">eugene</div>
              <div class="text-gray-500">@eugene</div>
              <div class="text-gray-500">1월 31일</div>
            </dic>
            <div class="text-gray-500">메세지</div>
          </div>
        </div>
        <!--a userlist list-->
        <div
          @click="onSelectUser(user)"
          class="flex px-3 py-4 hover:bg-gray-50 border-b border-gray-100"
          v-for="user in users"
          :key="user.id"
        >
          <img
            :src="user.profile_image_url"
            class="w-10 h-10 rounded-full cursor-pointer mr-2"
          />
          <div>
            <dic class="flex space-x-1">
              <div class="font-bold">{{ user.email }}</div>
              <div class="text-gray-500">@{{ user.username }}</div>
              <div class="text-gray-500">
                {{ mement(user, created_at).format("M월 dd일") }}
              </div>
            </dic>
            <div class="text-gray-500">메세지</div>
          </div>
        </div>
      </div>
    </div>
    <!--chatting-->
    <div class="w-3/5 border-r border-gray-100" v-if="selectedUser">
      <div class="flex flex-col h-screen">
        <!--title-->
        <div class="flex px-3 h-14 items-center border-b border-gray-100">
          <img
            src="http://picsum.photos/100"
            class="w-8 h-8 rounded-full mr-2 cursor-pointer"
          />
          <div>
            <div class="font-bold text-lg">eugene</div>
            <div class="text-sm text-gray-100">@eugene</div>
            <div></div>
          </div>
        </div>
        <!--user info-->
        <div
          class="flex flex-col justify-center items-center border-b border-gray-100 hover:bg-gray-50 py-6"
        >
          <div>
            <span class="font-bold mr-1">eugene.com</span>
            <span class="text-gray-500">eugene</span>
          </div>
          <div>
            <span class="font-bold mr-1">28</span
            ><span class="text-gray-500">팔로우 중</span
            ><span class="font-bold ml-3 mr-1">7</span
            ><span class="text-gray-500">팔로워</span>
          </div>
          <div>
            <span class="text-gray-500 mr-1">가입일</span>
            <span class="text-gray-500">2011년 10월</span>
          </div>
        </div>
        <div class="flex-1 bg-green-50 overflow-y-scroll">
          <div v-for="message in messages" :key="message.id">
            <!-- chat bubble : my chat-->
            <div
              class="text-right px-3 py-3"
              v-if="currentUser.uid === message.from_uid"
            >
              <span class="bg-primary text-white px-4 py-2 rounded-full">{{
                message.messageBody
              }}</span>
              <div class="mt-2 text-xs text-gray-500">
                {{ moment(message.created_at).fromNow() }}
              </div>
            </div>
            <!-- chat bubble : opponent chat-->
            <div class="text-left px-3 py-3" v-else>
              <span class="bg-gray-100 px-4 py-2 rounded-full">{{
                (message, messageBody)
              }}</span>
              <div class="mt-2 text-xs text-gray-500">
                {{ moment(message.created_at).fromNow() }}
              </div>
            </div>
          </div>
        </div>

        <!--chat input-->
        <duv class="flex items-center bg-white border-t border-gray-100 sticky">
          <input
            @keyup.enter="onSendMessage"
            v-model="messageBody"
            type="text"
            class="m-2 py-1 px-4 rounded-full bg-gray-100 resize-none outline-none flex-1"
            placeholder="새 쪽지 장성"
          />
          <button class="next-center" @click="onSendMessage">
            <i
              class="far fa-paper-plane text-primary text-lg hover:bg-blue-50 p-2 rounded-full p-2 rounded-full w-10 h-10"
            ></i>
          </button>
        </duv>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onBeforeMount, ref } from "@vue/runtime-core";
import { MESSAGE_COLLECTION, USER_COLLECTION } from "../firebase";
import store from "../store";
import moment from "moment";
export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    const users = ref([]);
    const selectedUser = ref(null);
    const messageBody = ref("");
    const messages = ref([]);
    onBeforeMount(async () => {
      const snapshot = await USER_COLLECTION.orderBy("create_at", "desc").get();
      snapshot.docs.forEach((doc) => {
        let user = doc.data();
        if (user.email === currentUser.value.email) return;
        users.value.push(user);
      });
    });

    const onSelectUser = async (user) => {
      selectedUser = user;

      let snapshot = await MESSAGE_COLLECTION.where(
        "from_uid",
        "==",
        currentUser.value.uid
      )
        .where("to_uid", "==", selectedUser.value.uid)
        .get();
      messages.value = snapshot.docs.map((doc) => doc.data());

      snapshot = await MESSAGE_COLLECTION.where(
        "to_uid",
        "==",
        currentUser.value.uid
      )
        .where("from_uid", "==", selectedUser.value.uid)
        .get();
      snapshot.docs.map((doc) => messages.value.push(doc.data()));

      messages.value = messages.value.sort((a, b) =>
        a.created_at > b.created_at ? 0 : -1
      );
    };

    const onSendMessage = async () => {
      if (!messageBody.value || !selectedUser.value) return;
      const doc = MESSAGE_COLLECTION.doc();
      let message = {
        id: doc.id,
        from_uid: currentUser.value.uid,
        to_uid: selectedUser.value.uid,
        message_body: messageBody.value,
        created_at: Date.now(),
      };
      await doc.set(message);
      messages.value.push(message);
      messageBody.value = "";
    };

    return {
      currentUser,
      users,
      moment,
      onSelectUser,
      onSendMessage,
      messages,
      messageBody,
      selectedUser,
    };
  },
};
</script>
<style lang=""></style>
