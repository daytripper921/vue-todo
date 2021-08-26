const addOneItem = (state, todoItem) => { // input에서 버튼 누르면 새로 등록
                      
    const obj = {completed: false, item: todoItem};

    // 로컬에 등록
    localStorage.setItem(todoItem, JSON.stringify(obj)); 
    // 리스트 배열에 넣기
    state.todoItems.push(obj); //위에 인자를 통해 state 접근한 것임.
}
const removeOneItem = (state, payload) => { // payload: 리스트에서 보낸 객체(todoItem, index)
    
    //해당 key의 아이템을 지움
    localStorage.removeItem(payload.todoItem.item); //obj 아닌, key값에 접근해서 삭제

    //화면 목록에서도 삭제 
    //변경해서 새로운 배열을 반환(slice와 차이점)
    state.todoItems.splice(payload.index, 1);
}
const toggleOneItem = (state, payload) => {

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
}
const clearAllItems = (state) => {
    localStorage.clear();
    state.todoItems = [];
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems }