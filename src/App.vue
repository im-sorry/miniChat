<template>
  <div id="app" class="h100">
    <mt-header fixed :title="headTitle">
        <mt-button type="default" icon="back" slot="left" @click="$router.go(-1)">返回</mt-button>
        <mt-button type="default" icon="more" slot="right" @click="$router.push('/config')"></mt-button>
    </mt-header>
    <transition class="tl" name="tl" mode="out-in">
      <router-view v-if="viewShow"/>
    </transition>
    <mt-tabbar fixed>
      <mt-tab-item>
        <router-link to="/chat" @click="changeTitle('聊天')">
          最近
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/friend" @click="changeTitle('联系人')">
          线上
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/group" @click="changeTitle('群聊')">
          群聊
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/states" @click="changeTitle('动态')">
          动态
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import bus from './bus'
  export default {
    name: 'App',
    provide(){
      return {
      }
    },
    data(){
      return {
        title: '聊天',
        isRouterActive: true,
        viewShow: true
      }
    },
    created(){
      bus.$on('update', () => {
        this.update();
      })
    },
    computed: {
      headTitle(){
        return this.$store.state.headTitle;
      },
    },
    methods: {
      changeTitle(t){
        this.title = t;
      },
      update(){
        this.viewShow = false;
        this.$nextTick(() => {
          this.viewShow = true;
          this.$nextTick(() => {
            bus.$emit('scroll');
          })
        })
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  a{
    text-decoration:none;
    font-size:13px;
  }
  a.router-link-active{
    color:yellow;
    font-size:18px;
  }
  .tl-enter{
    transform-origin:left top;
    opacity:0;
    transform: translateX(-20px);
  }
  .tl-enter-active{
    transform-origin:left top;
    transition:all .5s ease;
    opacity:1;
    transform: translateX(0);
  }
  .tl-leave{
    opacity:.5;
    transform: scale(1);
  }
  .tl-leave-active{
    transform-origin:left top;
    transition:all .5s ease;
    opacity:0;
    transform: scale(0);
  }
</style>
