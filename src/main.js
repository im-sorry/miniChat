// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/'
import bus from './bus'
Vue.config.productionTip = false

//使用socket.io
import io from 'socket.io-client'
let url = "http://www.hanqx.xin:8008";
let name = window.localStorage.getItem('name'),
    account = window.localStorage.getItem('account');
if(account){
  url += "?name=" + name + "&account=" + account;
}
console.log(url)
const socket = io(url);
socket.on('initData', data => {
  store.commit('initData', data);
  window.localStorage.setItem('account', data.account);
  window.localStorage.setItem('name', data.name);
});
socket.on('onlineNum', num => {
  store.commit('setOnlineNum', num);
});
socket.on('groupMsg', data => {
  store.commit('addGroupMsg', data);
  bus.$emit('groupScroll');
});
socket.on('persons', data => {
  store.commit('persons', data);
});
socket.on('changeName', data => {
  store.commit('changeName', data);
  bus.$emit('update');
});
socket.on('oneToOneChat', data => {
  store.commit('oneToOneChat', data);
});
Vue.prototype.$s = socket;

//使用vuex
import vuex from 'vuex'
Vue.use(vuex);


//使用mint-ui
import 'mint-ui/lib/style.css'
import mintUi from 'mint-ui'
Vue.use(mintUi);

//使用Header
import {Header} from 'mint-ui'
Vue.component(Header.name, Header);

//使用button
import {Button} from 'mint-ui'
Vue.component(Button.name, Button);

//使用tabbar
import { Tabbar, TabItem } from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

//使用cell
import {Cell} from 'mint-ui'
Vue.component(Cell.name, Cell)

//使用field
import { Field } from 'mint-ui';
Vue.component(Field.name, Field);

//使用Range
import { Range } from 'mint-ui';
Vue.component(Range.name, Range);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
