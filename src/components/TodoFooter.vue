<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" v-on:click="clearTodo">Clear All</span>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
  methods: {
    // 로컬스토리지의 모든 데이터 삭제
    clearTodo: function(){
      localStorage.clear();
    }
  }
}
</script>

<style scoped>
.clearAllContainer {width: 8.5rem; height: 50px; line-height: 50px; background:#fff; border-radius: 5px; margin: 0 auto;}
.clearAllBtn {color: #e20303; display: block; font-weight: bold;}

</style>