<template>
  <div id="app">
    <TodoHeader> </TodoHeader>
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드 명"/> -->
    <TodoInput v-on:addTodoItem="addOneItem"/>
    <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름="현재 위치의 컴포넌트 데이터 속성"/> -->
    <!-- emit으로 지우는 함수 받기 & 체크 토글 함수 받기-->
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem="toggleOneItem"/>
    <TodoFooter @clearAll="clearAllItems"/>
  </div>
</template>

<script>
// import
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';



export default {
  name: 'App',
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    // input에 입력했을 때, 아이템 등록
    // 1 - 파라미터 추가
    addOneItem: function(todoItem){
                
      // 텍스트 값과 더불어, 완료됐는지 여부를 객체에 저장
      // var obj = {completed: false, item: this.newTodoItem};

      // 파라미터로 변경 .. input에서 this.newTodoItem을 인자로 받았음
      var obj = {completed: false, item: todoItem};

      // 저장하는 로직
      // js객체를 스트링으로 변환해서 저장
      localStorage.setItem(todoItem, JSON.stringify(obj)); 

      // 항목 삽입
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index){
     //해당 key의 아이템을 지움 // app으로 옮기기
      localStorage.removeItem(todoItem.item); //obj 아닌, key값에 접근해서 삭제

      //화면 목록에서도 삭제 
      //변경해서 새로운 배열을 반환(slice와 차이점)
      this.todoItems.splice(index, 1);
    },
    // 체크 토글
    toggleOneItem: function(todoItem, index){
      
      // completed 값 반대로 바꾸기
      // todoItem.completed = !todoItem.completed;
      // 위 방법은 props로 내린 todoItems를 다시 emit으로 todoItem이라는 이름으로 받은 걸 다시 바꾼거임. 좋지 않음.todoItems을 변경할 거임!!!!
      this.todoItems[index].completed = !this.todoItems[index].completed;

      // 값 반대로 바꾼 걸 업데이트해야하는데, 해당api가 없기 때문에 지웠다가, 바뀐 값을 다시 저장하는거임.

      // 로컬스토리지 데이터 갱신
      // 완료시 삭제
      localStorage.removeItem(todoItem.item);
      // completed값이 바뀐 상태의 해당 아이템 다시 추가
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function(){
      localStorage.clear();
      this.todoItems = [];
    }
  },
  
  // todoList에 있던 todoitems[]와 lifecycle hook 옮겨옴
  created: function(){

    if (localStorage.length > 0) { // 저장된 값 있으면 key를 가져와서 담기
      for ( var i=0; i < localStorage.length ; i++){
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {

          // input에서 setitem에 stringify 했기때문에 스트링임. 다시 객체로 바꿔야 함.
          // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // 아까 단순 문자열일 때는 로컬 스토리지에서 key와 value가 똑같아서 맞춰줄 필요가 없었지만, 지금 value에 json 형태로 들어가있어서(completed & item), value에서 또 item의 값만 꺼내와야 하기 때문에 바꿔야 함.
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
  components: {
    'TodoHeader' : TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter : TodoFooter
  }
}
</script>

<style>
body {text-align: center; background: #f6f6f6;}
input {border-style: groove; width: 200px;}
button {border-style: groove;}
.shadow {box-shadow: 5px 10px 10px rgba(0,0,0,0.03);}
</style>
