<template lang="">
  <!--tweets-->
  <div class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-100">
    <img
      src="http://picsum.photos/200"
      class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
    />
    <div class="ml-3 flex-1 flex flex-col space-y-1">
      <div class="text-sm space-x-1">
        <span class="font-bold">엽rl</span>
        <span class="text-gray-500 text-xs">@yeopon</span>
        <span>·</span>
        <span class="text-gray-500 text-xs">57분</span>
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
          <i class="far fa-share-square hover:bg-blue-50 rounded-full p-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
