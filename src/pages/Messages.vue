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
            src='http://picsum.photos/200"/'
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
        <!--a chat list-->
        <div
          class="flex px-3 py-4 hover:bg-gray-50 border-b border-gray-100"
          v-for="message in 10"
          :key="message"
        >
          <img
            src='http://picsum.photos/200"/'
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
      </div>
    </div>
    <!--chatting-->
    <div class="w-3/5 border-r border-gray-100">
      <div class="flex flex-col">
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
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
