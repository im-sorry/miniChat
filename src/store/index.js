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
      deleteMoreMsg(state.groupMsg, state.historyNum);
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
        if(item.account === data.account){
          item.name = data.name;
        }
      });
      if(state.account === data.account){
        for(let i in state.msgWith){
          state.msgWith[i].forEach(item => {
            if(item.account === data.account){
              item.name = data.name;
            }
          })
        }
      }else{
        state.nearMsg.forEach(item => {
          if(item.account === data.account){
            item.name = data.name;
          }
        });
        if(!state.msgWith[data.account])return;
        state.msgWith[data.account].forEach(item => {
          if(item.account === data.account){
            item.name = data.name;
          }
        })
      }
    },
    setChatWithWho(state, account){
      state.chatWithWho = account;
      let item = state.nearMsg.find(item => item.account === account);
      if(item){
        item.noViewMsgNum = 0;
      }
    },
    oneToOneChat(state, data){
      let obj = state.msgWith[data.account],
          indexInNear = state.nearMsg.findIndex(item => item.account === data.account);
      if(indexInNear === -1){
        indexInNear = state.nearMsg.length;
        state.nearMsg.push({
          id: data.fromId,
          headUrl: data.headUrl,
          name: data.name,
          noViewMsgNum: 1,
          account: data.account
        });
      }else if(state.account !== data.account) {
        let num = state.nearMsg[indexInNear]['noViewMsgNum'] + 1;
        state.nearMsg.splice(indexInNear, 1, {
          id: data.fromId,
          headUrl: data.headUrl,
          name: data.name,
          noViewMsgNum: num,
          account: data.account
        });
      }
      if(obj === undefined){
        obj = state.msgWith[data.account] = [];
      }
      obj.push(data);
      deleteMoreMsg(obj, state.historyNum);
      bus.$emit('update');

    },
    addOneToOneMsg(state, {id, name, headUrl, account, msg}){
      let obj = state.msgWith[account],
          indexInNear = state.nearMsg.findIndex(item => item.account === account);
      if(indexInNear === -1){
        state.nearMsg.push({
          id,
          headUrl,
          name,
          noViewMsgNum: 0,
          account
        });
      }
      if(obj === undefined){
        obj = state.msgWith[account] = [];
      }
      obj.push(msg);
      deleteMoreMsg(obj, state.historyNum);
    },
    setAccount(state, a){
      state.account = a;
    }
  },
  getters: {
  }
});

function deleteMoreMsg(arr, maxNum){
  if(arr.length <= maxNum) return;
  arr.splice(0, arr.length - maxNum);
}
