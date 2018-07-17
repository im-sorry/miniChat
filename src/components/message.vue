<template>
    <div class="message" :class="dir" :data-id="id">
      <img :src="headUrl" alt="" class="headImg">
      <div>
        <mt-cell :title="message" :class="dir">
        </mt-cell>
        <div class="text" :class="dir" v-text="msg"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "message",
        props: ['headUrl', 'msg', 'time', 'dir', 'id', 'name'],
        computed:{
          message(){
            return this.name ? this.name + " " +this.time : this.time;
          }
        }
    }
</script>

<style scoped lang="scss">
  .message.right{
    flex-direction:row-reverse;
  }
  .message.left{
    text-align:left;
  }
  .message{
    display: flex;
    justify-content: space-between;
    img{
      display: block;
      width:30px;
      height:30px;
      margin-top:10px;
    }
    div{
      flex-grow:1;
      .mint-cell{
        min-height:40px;
        background-color: transparent;
      }
      .mint-cell.right{
        text-align:right;
      }
      .text{
        box-sizing:border-box;
        padding: 5px 15px;
        min-width:50px;
        min-height:20px;
        max-width:200px;
        background:url(../assets/img/dialog-l.png) no-repeat center/100% 100%;
        text-align:left;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .text.left{
        float:left;
      }
      .text.right{
        float:right;
      }
    }

  }

</style>
