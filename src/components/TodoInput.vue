<template>
  <div class="inputBox shadow">
    
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo"> 

    <!-- <button>add</button> -->

    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>

  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  data(){
    return {
      newTodoItem: '',
    }
  },
  methods: {
    addTodo: function(){
      // 3 - 값이 있을때만 저장하도록 if문으로 감싸줌
      if (this.newTodoItem !== ''){
          
        // 1 - 텍스트 값과 더불어, 완료됐는지 여부를 객체에 저장
        var obj = {completed: false, item: this.newTodoItem};

        // 저장하는 로직
        // 2 - js객체를 스트링으로 변환해서 저장
        // localStorage.setItem(this.newTodoItem, obj); //참고
        localStorage.setItem(this.newTodoItem, JSON.stringify(obj)); 

        //초기화
        // this.newTodoItem = '';
        this.clearInput();
      }

    },
    clearInput: function(){
      this.newTodoItem = '';
    }
  }
}
</script>

<style scoped>
input:focus {outline:none;}
.inputBox {background:#fff; height: 50px; line-height: 50px; border-radius: 5px; width: 100%; padding-right: 3.5rem; box-sizing: border-box;position: relative; padding-left: 10px;}
.inputBox input {border-style: none; font-size: 0.9rem; width: 100%; height: 100%;box-sizing: border-box;}
.addContainer { background: linear-gradient(to right, #6478FB, #8763FB); display: block; width: 3rem; border-radius: 0 5px 5px 0;position: absolute; right: 0; top: 0;}
.addBtn {color:#fff; vertical-align: middle; }

</style>