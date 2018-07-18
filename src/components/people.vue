<template>
    <div class="wrap">
      <mt-cell is-link :title="name" :to="{name:'chatWithIt', query:{id, name, headUrl, account}}">
        <img :src="headUrl" alt="" class="headImg" slot="icon">
        <slot name="right" slot="right"></slot>
      </mt-cell>
    </div>
</template>

<script>
    export default {
        name: "people",
        props:['id', 'headUrl', 'name', 'account'],
        data(){
          return {

          }
        }
    }
</script>

<style scoped>
  .wrap{
    border-bottom:1px solid gray;
    text-align:left;
  }
  .wrap img{
    width:30px;
    height:30px;
    border-radius:10px;
  }
</style>
