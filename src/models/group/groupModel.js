
import * as groupService from '../../services/group';

export default {

  namespace: 'groupModel',

  state: {
    groupList: [],
  },

  effects: {
    * queryList ({ payload }, {call, put}) {
      const rsp = yield call(groupService.queryList);
      console.log('group model queryList =' + JSON.stringify(rsp.data));
      yield put({ type: 'saveList', payload: { groupList: rsp.data } });
    },
    * deleteOne ({ payload }, {call, put, select}) {
      console.log('groupService delete one payload =' + JSON.stringify(payload));
      yield call(groupService.deleteOne, payload);
      const groupModel = yield select((state) => state.groupModel);
      yield put({ type: 'queryList', payload: {...groupModel} });
    },
    * addOne ({ payload }, {call, put}) {
      console.log('groupService add one payload =' + JSON.stringify(payload));
      const rsp = yield call(groupService.addOne, payload);
      yield put({ type: 'queryList' });
      return rsp;
    },
    * updateOne ({ payload }, { call, put }) {
      console.log('groupService update one payload =' + JSON.stringify(payload));
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
