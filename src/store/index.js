import vuex from 'vuex'
import vue from 'vue'
import bus from '@/bus'
vue.use(vuex);


const maxNum = 50;
export default new vuex.Store({
  state: {
    headTitle: '消息',
    groupMsg:[],
    onlinePersons:[],
    onlineNum: 0,
    name: '',
    id: '',
    account: '',
    headUrl: '',
    email: '',
    historyNum: 20,
    phone: '',
    introduction: '',
    chatWithWho: '',
    nearMsg: [],
    msgWith:{}
  },
  mutations: {
    addGroupMsg(state, msg){
      state.groupMsg.push(msg);
      if(state.groupMsg.length >= maxNum){
        state.groupMsg.splice(0, state.groupMsg.length - maxNum);
      }
    },
    persons(state, p){
      state.onlinePersons = p;
    },
    changeOnlineNum(state, num){
      state.onlineNum = num;
    },
    setName(state, n){
      state.name = n;
    },
    setId(state, id){
      state.id = id;
    },
    initData(state, data){
      state.id = data.id;
      state.name = data.name;
      state.headUrl = data.headUrl;
      state.account = data.account;
    },
    SetHeadTitle(state, t){
      state.headTitle = t;
    },
    saveUserInfo(state, data){
      state.name = data.name;
      state.email = data.email;
      state.introduction = data.introduction;
      state.phone = data.phone;
    },
    changeName(state, data){
      state.groupMsg.forEach(item => {
        if(item.id === data.id){
          item.name = data.name;
        }
      });
      if(state.id === data.id){
        for(let i in state.msgWith){
          state.msgWith[i].forEach(item => {
            if(item.fromId === data.id){
              item.name = data.name;
            }
          })
        }
      }else{
        state.nearMsg.forEach(item => {
          if(item.id === data.id){
            item.name = data.name;
          }
        });
        if(!state.msgWith[data.id])return;
        state.msgWith[data.id].forEach(item => {
          if(item.fromId === data.id){
            item.name = data.name;
          }
        })
      }
    },
    setChatWithWho(state, id){
      state.chatWithWho = id;
    },
    oneToOneChat(state, data){
      let obj = state.msgWith[data.fromId],
          indexInNear = state.nearMsg.findIndex(item => item.id === data.fromId);
      if(indexInNear === -1){
        indexInNear = state.nearMsg.length;
        state.nearMsg.push({
          id: data.fromId,
          headUrl: data.headUrl,
          name: data.name,
          noViewMsgNum: 1
        });
      }
      if(obj === undefined){
        obj = state.msgWith[data.fromId] = [];
      }
      obj.push(data);
      //state.msgWith[data.fromId] = [].concat(obj);
      bus.$emit('update');
      if(state.chatWithWho !== data.fromId) {
        let num = state.nearMsg[indexInNear]['noViewMsgNum'] + 1;
        state.nearMsg.splice(indexInNear, 1, {
          id: data.fromId,
          headUrl: data.headUrl,
          name: data.name,
          noViewMsgNum: num
        });
      }
    },
    addOneToOneMsg(state, {id, name, headUrl, msg}){
      let obj = state.msgWith[id],
          indexInNear = state.nearMsg.findIndex(item => item.id === id);
      if(indexInNear === -1){
        state.nearMsg.push({
          id,
          headUrl,
          name,
          noViewMsgNum: 0
        });
      }
      if(obj === undefined){
        obj = state.msgWith[id] = [];
      }
      obj.push(msg);
    }
  },
  getters: {
  }
})
