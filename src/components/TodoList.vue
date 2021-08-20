<template>
  <div>
      <ul>
        <li v-for="(todoItem, i) in todoItems" v-bind:key="i" class="shadow">
          <!-- 완료버튼 만들기 -->
          <i class="fas fa-check checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem, index)"></i>

          <p v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</p>

          <!-- item과 index를 리무브로 넘김 -->
          <span class="removeBtn" v-on:click="removeTodo(todoItem, i)">
            <i class="far fa-trash-alt"></i>
          </span>  
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 1 - 리스트 저장할 빈 배열 만들기
      todoItems: [], 
    }
  },
  // 2 - lifecycle hook /created :: 로컬 스토리지에 저장된 값 가져오기
  created: function(){

    if (localStorage.length > 0) { // 저장된 값 있으면 key를 가져와서 담기
      for ( var i=0; i < localStorage.length ; i++){
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {

          //기존
          // this.todoItems.push(localStorage.key(i)); 

          // input에서 setitem에 stringify 했기때문에 스트링임. 다시 객체로 바꿔야 함.
          // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // 아까 단순 문자열일 때는 로컬 스토리지에서 key와 value가 똑같아서 맞춰줄 필요가 없었지만, 지금 value에 json 형태로 들어가있어서(completed & item), value에서 또 item의 값만 꺼내와야 하기 때문에 바꿔야 함.
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
  methods: {
    // 클릭이벤트에서 인자로 넘긴 값 받기
    removeTodo: function(todoItem, i){
      console.log(todoItem, i);
      //해당 key의 아이템을 지움
      localStorage.removeItem(todoItem);

      //화면 목록에서도 삭제 
      //변경해서 새로운 배열을 반환(slice와 차이점)
      this.todoItems.splice(i, 1);
    },
    // 완료버튼 함수
    toggleComplete: function(todoItem, index){
      // console.log(todoItem);
      console.log(index);

      // completed 값 반대로 바꾸기
      todoItem.completed = !todoItem.completed;

      // 값 반대로 바꾼 걸 업데이트해야하는데, 해당api가 없기 때문에 지웠다가, 바뀐 값을 다시 저장하는거임.

      // 로컬스토리지 데이터 갱신
      // 완료시 삭제
      localStorage.removeItem(todoItem.item);
      // completed값이 바뀐 상태의 해당 아이템 다시 추가
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
  }
}
</script>

<style scoped>
ul {list-style-type: none; padding-left: 0; margin-top: 0; text-align: left;}
ul li {display: flex; margin: 0.5rem 0; padding: 0 0.9rem; background:#fff; border-radius: 5px; align-items: center; justify-content: space-between; box-sizing: border-box;min-height: 50px;}
ul li p {width: calc(100% - 35px); box-sizing: border-box; white-space: normal;word-break:break-all;}
.checkBtn {line-height: 20px; color: #62acde; margin-right: 10px;}
.checkBtnCompleted {color:#b3adad;}
.textCompleted {text-decoration: line-through; color: #b3adad;}
.removeBtn {margin-left: auto; color:#de4343;width: 15px; height: 50px;display: flex; align-items: center;}

</style>