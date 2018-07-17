import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/chat/index.vue'
import friend from '@/components/friend/index'
import group from '@/components/group/index'
import states from '@/components/states/index'
import chatWithIt from '@/components/chatWithIt'
import config from '@/components/config'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:{name: 'chat'}
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/friend',
      name: 'friend',
      component: friend
    },
    {
      path: '/group',
      name: 'group',
      component: group
    },
    {
      path: '/states',
      name: 'states',
      component: states
    },
    {
      path: '/chatWithIt',
      name: 'chatWithIt',
      component: chatWithIt
    },
    {
      path: '/config',
      name: 'config',
      component:config
    }
  ]
})
