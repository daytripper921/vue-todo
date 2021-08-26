import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters'
import * as mutations from './mutations'

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
    // getters: getters,
    mutations: mutations
});