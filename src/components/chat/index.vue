<template>
    <div class="container">
      <people v-for="(item, index) in msg" :id="item.id" :name="item.name" :headUrl="item.headUrl" :key="index"></people>
      <div class="tip">

      </div>
    </div>
</template>

<script>
    import people from '../people'
    export default {
        name: "message",
        components: {
          people
        },
        data(){
          return {
          }
        },
        computed:{
          msg(){
            return this.$store.state.nearMsg;
          }
        },
        methods: {
        }
    }
</script>

<style scoped>
  .container{
    margin-top:-20px;
  }
</style>
