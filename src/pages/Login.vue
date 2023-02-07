<template lang="">
  <div class="flex flex-col items-center space-y-4 mt-10">
    <i
      :class="`fab fa-twitter text-4xl text-primary ${
        loading ? 'animate-bounce' : ''
      }`"
    ></i>
    <span class="text-2xl font-bold">뜨위터 회원가입</span>
    <input
      v-model="username"
      type="text"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="이메일"
    />
    <input
      @keyup.enter="onRegister"
      v-model="password"
      type="password"
      class="rounded w-96 px-4 py-3 border border-gray-300 focus:ring-2 focus:border-primary focus:outline-none"
      placeholder="비밀번호"
    />
    <button v-if="loading" class="w-96 rounded bg-light text-white py-3">
      로그인 중입니다.
    </button>
    <button
      @keyup.enter="onLogin"
      v-else
      class="w-96 rounded bg-primary text-white py-3 hover:bg-dark"
      @click="onLogin"
    >
      로그인
    </button>
    <router-link to="/register"
      ><button class="text-primary">
        계정이 없으신가요? 회원가입하기
      </button></router-link
    >
  </div>
</template>
<script>
import { ref } from "vue";
import { auth } from "../firebase";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(true);
    const router = useRouter();

    const onLogin = async () => {
      try {
        loading.value = true;
        const { user } = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        router.replace("/");
      } catch (e) {
        switch (e.code) {
          case "auth/invalid-email":
            alert("잘못된 이메일입니다.");
            break;
          case "auth/wrong-password":
            alert("잘못된 이메일 형식입니다.");
            break;
          case "auth/user-not-found":
            alert("등록되지 않은 이메일입니다.");
            break;
          default:
            alert(e.message);
            break;
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      onLogin,
      loading,
    };
  },
};
</script>
<style lang=""></style>
