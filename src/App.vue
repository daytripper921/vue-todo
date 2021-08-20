<template>
  <div id="app">
    <TodoHeader> </TodoHeader>
    <TodoInput/>
    <TodoList/>
    <TodoFooter/>
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
  components: {
    'TodoHeader' : TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter : TodoFooter
  },
  data() {
    return {

    }
  }
}
</script>

<style>
body {text-align: center; background: #f6f6f6;}
input {border-style: groove; width: 200px;}
button {border-style: groove;}
.shadow {box-shadow: 5px 10px 10px rgba(0,0,0,0.03);}
</style>
