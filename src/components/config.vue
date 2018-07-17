<template>
    <div id="config">
      <mt-field label="账号" readonly :value="account" disableClear></mt-field>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="name" :value="name"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" :value="email"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" :value="phone"></mt-field>
      <mt-field placeholder="自我介绍" type="textarea" rows="4" v-model="introduction" :value="introduction"></mt-field>
      <mt-button type="primary" @click="modify">修改</mt-button>
    </div>
</template>

<script>
    import { MessageBox, Toast } from 'mint-ui';
    import {mapState} from 'vuex';
    export default {
        name: "config",
        data(){
          return {
            account: '1222',
            name: '',
            email: '',
            phone: '',
            historyNum: 20,
            introduction: ''
          }
        },
        created(){
          let msg = window.localStorage.getItem('userMsg');
          this.name = window.localStorage.getItem('name');
          this.account = window.localStorage.getItem('account');
          if(msg){
            let obj = JSON.parse(msg);
            this.email = obj.email;
            this.phone = obj.phone;
            this.introduction = obj.introduction;
          }
        },
        methods:{
          modify(){
            let data = {
              name: this.name,
              email: this.email,
              phone: this.phone,
              introduction: this.introduction
            };
            MessageBox.confirm('确定执行此操作?').then(() => {
              if(data.name === ''){
                Toast({
                  message: '名字不能是空',
                  duration: 1000,
                  position: 'middle',
                  iconClass: 'icon icon-success'
                });
                return;
              }
              this.saveUserMsgToWindow(data);
              if(data.name !== this.$store.state.name){
                this.$store.commit('changeName', {id: this.id, name:data.name});
                this.$s.emit('changeName', {id: this.id, name:data.name});
              }
              this.$store.commit('saveUserInfo', data);
              this.$nextTick(() => {
                Toast({
                  message: '成功',
                  duration: 1000,
                  position: 'middle',
                  iconClass: 'icon icon-success'
                });
              })
            }).catch(err => {
              console.log(err)
            });
          },
          saveUserMsgToWindow(data){
            window.localStorage.setItem('name', data.name);
            window.localStorage.setItem('userMsg', JSON.stringify(data));
          }
        },
        computed: {
          ...mapState(['id'])
        }
    }
</script>

<style scoped>

</style>
