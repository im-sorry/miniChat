<template>
    <div class="chatbox w100 h100">
      <mt-header :title="$route.query.name">
        <mt-button slot="left" icon="back" @click="$router.go(-1)">消息</mt-button>
        <mt-button slot="right"></mt-button>
      </mt-header>
      <div class="msg w100" ref="msg">
        <message v-for="(item, index) in msgWith[$route.query.account]" :dir="(item.fromId === id)? 'right' : 'left'" :id="item.fromId" :msg="item.msg" :time="item.time" :headUrl="item.headUrl" :name="item.name" :key="index"></message>
      </div>
      <div class="input">
        <div class="inputBox">
          <mt-field v-model="msg" class="field"></mt-field>
          <mt-button @click="send" size="small" type="danger" :disabled="buttonDisable">发送</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
    import message from './message'
    import {mapState, mapGetters} from 'vuex'
    import bus from '../bus'

    export default {
        name: "chatWithIt",
        data(){
          return {
            msg: '',
            buttonDisable: true
          }
        },
        components: {
          message
        },
        watch: {
          msg(val){
            this.buttonDisable = val === '';
          }
        },
        methods: {
          send(){
            let time = new Date().toTimeString().split(' ')[0],
                name = this.$route.query.name,
                headUrl = this.$route.query.headUrl,
                id = this.$route.query.id,
                account = this.$route.query.account,
                msg = {
                  toAccount: account,
                  time,
                  msg: this.msg,
                  fromId: this.id,
                  name: this.name,
                  headUrl: this.headUrl,
                  account: this.account,
                };
            this.$s.emit('oneToOneChat', msg);
            this.$store.commit('addOneToOneMsg', {id, name, headUrl, account, msg});
            this.msg = "";
            this.$nextTick(this.scrollToBottom);
          },
          scrollToBottom(){
            if(!this.$refs.msg){
              return;
            }
            let sheight = this.$refs.msg.scrollHeight,
                cheight = this.$refs.msg.clientHeight;
            if(sheight === cheight)return;
            this.$refs.msg.scrollTop = sheight - cheight;
          },
        },
        computed: {
          ...mapState(['name','id', 'headUrl','msgWith', 'account']),
        },
        created(){
          this.$store.commit('setChatWithWho', this.$route.query.account);
        },
        mounted(){
          bus.$on('scroll', () => {
            this.$nextTick(this.scrollToBottom);
          });
          this.scrollToBottom();
        },
        beforeRouteLeave(to, from, next){
          this.$store.commit('setChatWithWho', '');
          next();
        }
    }
</script>

<style scoped lang="scss">
  .chatbox{
    display: flex;
    flex-direction: column;
    position:fixed;
    top:0;
    background-color: rgba(255,255,0,.5);
    z-index:10;
  }
  .msg{
    flex-grow:1;
    border:1px solid;
    border-left:none;
    border-right:none;
    height:calc(100% - 72px);
    overflow:scroll;
  }
  .input{

    div{
      .mint-button{
        white-space: nowrap;
      }
    }
  }
</style>
