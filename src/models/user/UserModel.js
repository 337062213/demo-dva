import * as groupService from '../../services/group';
import * as userService from '../../services/User';

export default {
  namespace: 'user',
  state: {
    // 用户数组
    userList: [],
    groupList: [],
    flag: [],
    report: {},
    name: '',
    gid: '',
  },

  effects: {
    * queryList ({ payload = [] }, { call, put }) {
      const {gid = '', name = ''} = payload;
      const rsp1 = yield call(groupService.queryList);
      const rsp = yield call(userService.queryList, name, gid);
      console.log('user model queryList =' + JSON.stringify(rsp.data));
      yield put({ type: 'saveList', payload: { userList: rsp.data, groupList: rsp1.data}});
    },
    * deleteOne ({ payload }, { select, call, put }) {
      console.log('userService delete one payload =' + JSON.stringify(payload));
      yield call(userService.deleteOne, payload);
      const user = yield select((state) => state.user);
      yield put({ type: 'queryList', payload: { ...user } });
    },
    * addOne ({ payload }, { select, call, put }) {
      console.log('userService add one payload =' + JSON.stringify(payload));
      const rsp = yield call(userService.addOne, payload);
      const user = yield select((state) => state.user);
      yield put({ type: 'queryList', payload: { ...user } });
      return rsp;
    },
    * updateOne ({ payload }, { select, call, put }) {
      console.log('userService update one payload =' + JSON.stringify(payload));
      const rsp = yield call(userService.updateOne, payload);
      const user = yield select((state) => state.user);
      yield put({ type: 'queryList', payload: { ...user } });
      return rsp;
    },
    * saveFlag ({ payload }, {put, select}) {
      const user = yield select((state) => state.user);
      yield put({ type: 'saveList', payload: { ...user, report: payload, flag: payload.flag } });
    },
  },

  reducers: {
    saveList (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      // 侦听是否需要切换路径
      window.addEventListener('message', function (e) {
        const name = JSON.parse(e.data).name;
        const route = JSON.parse(e.data).route;
        if (name === 'user') {
          location.href = route;
        }
      });
      return history.listen((pathname, query) => {
        if (pathname.pathname === '/user') {
          dispatch({
            type: 'queryList',
          });
        }
      });
    },
  },
};
