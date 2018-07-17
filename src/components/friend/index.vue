<template>
   <div class="friend">
     <people v-for="(item, index) in onlinePersons" :id="item.id" :name="item.name" :headUrl="item.headUrl" :key="index" v-if="id !== item.id"></people>
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
    margin-top:-20px;
  }
</style>
