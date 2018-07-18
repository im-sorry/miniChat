<template>
    <div class="container mainbox">
      <people v-for="(item, index) in msg" :id="item.id" :name="item.name" :headUrl="item.headUrl" :account="item.account" :key="index">
        <mt-badge slot="right" size="small" color="red" v-if="item.noViewMsgNum !== 0">{{item.noViewMsgNum}}</mt-badge>
      </people>
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
</style>
