<template>
    <div class="w100 group mainbox">
      <div class="msg w100" ref="msg">
        <message v-for="(item, index) in groupMsg" :dir="item.id === id? 'right' : 'left'" :id="item.id" :msg="item.msg" :time="item.time" :headUrl="item.headUrl" :name="item.name" :key="index"></message>
      </div>
      <div class="input">
        <div class="inputBox">
          <mt-field v-model="msg" class="field" @mouseenter.enter="send"></mt-field>
          <mt-button @click="send" size="small" type="danger" :disabled="buttonDisable">发送</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
    import message from '../message'
    import {mapState} from 'vuex'
    import bus from '../../bus'
    export default {
        name: "index",
        data(){
          return {
            msg: '',
            buttonDisable: true
          }
        },
        watch: {
          msg(val){
              this.buttonDisable = val === '';
          }
        },
        created(){
          bus.$on('groupScroll', () => {
            this.$nextTick(this.scrollToBottom);
          });
        },
        computed: {
          ...mapState(['id', 'name', 'headUrl', 'groupMsg','account'])
        },
        mounted(){
          this.scrollToBottom();
        },
        methods:{
          send(){
            let time = new Date().toTimeString().split(' ')[0],
                msg = {
                  time,
                  msg: this.msg,
                  id: this.id,
                  name: this.name,
                  headUrl: this.headUrl,
                  account: this.account
                };
            this.$s.emit('groupMsg', msg);
            this.$store.commit('addGroupMsg', msg);
            this.msg = "";
            this.$nextTick(this.scrollToBottom);
          },
          scrollToBottom(){
            let sheight = this.$refs.msg.scrollHeight,
                cheight = this.$refs.msg.clientHeight;
            if(sheight == cheight)return;
            this.$refs.msg.scrollTop = sheight - cheight;
          }
        },
        components: {
          message
        }
    }
</script>

<style scoped>
  .group{
    display: flex;
    flex-direction: column;
  }
  .msg{
    flex-grow:1;
    overflow: scroll;
  }

</style>
