import Vue from 'vue'
import Vuex from 'vuex'

// use는 vue의 플러그인. 전역.
Vue.use(Vuex);

// 로컬스토리지 관련 api 옮김
const storage = {
    fetch() {

        const arr = []; // 새로 선언하고 밑에 this.todoItems를 대체함.

        // app.vue에 있던 created() 옮김
        // todoList에 있던 todoitems[]와 lifecycle hook 옮겨옴 - X
        if (localStorage.length > 0) { // 저장된 값 있으면 key를 가져와서 담기
            for ( let i=0; i < localStorage.length ; i++){
              if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
      
                // input에서 setitem에 stringify 했기때문에 스트링임. 다시 객체로 바꿔야 함.
                // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                // 아까 단순 문자열일 때는 로컬 스토리지에서 key와 value가 똑같아서 맞춰줄 필요가 없었지만, 지금 value에 json 형태로 들어가있어서(completed & item), value에서 또 item의 값만 꺼내와야 하기 때문에 바꿔야 함.
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
              }
            }
        }

        return arr //
    },
}

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch(), // fetch로 가져옴
    }, 
    // getters: {
    //     storedTodoItems(state) {
    //         return state.todoItems
    //     }
    // },
    mutations: {
        addOneItem(state, todoItem) { // input에서 버튼 누르면 새로 등록
                      
            const obj = {completed: false, item: todoItem};

            // 로컬에 등록
            localStorage.setItem(todoItem, JSON.stringify(obj)); 
            // 리스트 배열에 넣기
            state.todoItems.push(obj); //위에 인자를 통해 state 접근한 것임.
        },
        removeOneItem(state, payload) { // payload: 리스트에서 보낸 객체(todoItem, index)
            
            //해당 key의 아이템을 지움
            localStorage.removeItem(payload.todoItem.item); //obj 아닌, key값에 접근해서 삭제

            //화면 목록에서도 삭제 
            //변경해서 새로운 배열을 반환(slice와 차이점)
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload){
      
            // completed 값 반대로 바꾸기
            // todoItem.completed = !todoItem.completed;
            // 위 방법은 props로 내린 todoItems를 다시 emit으로 todoItem이라는 이름으로 받은 걸 다시 바꾼거임. 좋지 않음.todoItems을 변경할 거임!!!!
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
      
            // 값 반대로 바꾼 걸 업데이트해야하는데, 해당api가 없기 때문에 지웠다가, 바뀐 값을 다시 저장하는거임.
      
            // 로컬스토리지 데이터 갱신
            // 완료시 삭제
            localStorage.removeItem(payload.todoItem.item);
            // completed값이 바뀐 상태의 해당 아이템 다시 추가
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }

});