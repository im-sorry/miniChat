<template>
   <div class="friend mainbox">
     <people v-for="(item, index) in onlinePersons" :id="item.id" :name="item.name" :headUrl="item.headUrl" :key="index" :account="item.account" v-if="id !== item.id"></people>
   </div>
</template>

<script>
    import people from '../people'
    import {mapState} from 'vuex'

    export default {
        name: "friend",
        data(){
          return {
          }
        },
        components: {
          people
        },
        computed: {
          ...mapState(['onlinePersons', 'id'])
        }
    }
</script>

<style scoped>
  .friend{
  }
</style>
