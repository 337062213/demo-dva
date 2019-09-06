
import * as groupService from '../../services/group';

export default {

  namespace: 'groupModel',

  state: {
    groupList: [],
  },

  effects: {
    * queryList ({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(groupService.queryList);
      console.log('groupService queryList');
      console.log(rsp.data);
      yield put({ type: 'saveList', payload: { groupList: rsp.data } });
    },
    * deleteOne ({ payload }, { call, put }) {
      console.log('groupService delete one payload' + payload);
      yield call(groupService.deleteOne, payload);
      yield put({ type: 'queryList' });
    },
    * addOne ({ payload }, { call, put }) {
      const rsp = yield call(groupService.addOne, payload);
      yield put({ type: 'queryList' });
      return rsp;
    },
    * updateOne ({ payload }, { call, put }) {
      console.log('groupService update' + payload);
      const rsp = yield call(groupService.updateOne, payload);
      yield put({ type: 'queryList' });
      return rsp;
    },
  },

  reducers: {
    saveList (state, { payload: { groupList } }) {
      return {
        ...state,
        groupList,
      };
    },
  },

  subscriptions: {
    setup ({ dispatch }) {
      dispatch({
        type: 'queryList',
      });
    },
  },
};
