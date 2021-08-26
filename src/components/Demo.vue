<template>
  <div id="root">
    <!-- <p>{{ this.$store.getters.orignalPrice }}</p> 100 -->
    <!-- 위 처럼 가져와야 하는데, computed에 함수로 만들면 아래처럼 쓸 수 있음 -->
    <p>{{ orignalPrice }}</p> 100
    <p>{{ doublePrice }}</p> 200
    <p>{{ triplePrice }}</p> 300
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        // helper 함수 쓰면 이렇게 단축할 수 있음..!!!!
        ...mapGetters(['originalPrice', 'doublePrice', 'triplePrice'])

        // orignalPrice(){
        //     return this.$store.getters.orignalPrice
        // },
        // doublePrice(){
        //     return this.$store.getters.doublePrice
        // },
        // triplePrice(){
        //     return this.$store.getters.triplePrice
        // },
    }
}
</script>

<style>

</style>