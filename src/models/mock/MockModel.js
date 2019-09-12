import * as mockService from '../../services/mock';

export default {
  namespace: 'mock',
  state: {
    mockList: [],
    name: '',
    gid: '',
  },

  effects: {
    * queryList ({ payload = [] }, { call, put }) {
      console.log('mock payload');
      const {gid = '', name = ''} = payload;
      const rsp = yield call(mockService.queryList, name, gid);
      console.log('mock queryList');
      console.log(rsp.data.data);
      const test = rsp.data.data;
      yield put({ type: 'saveList', payload: { mockList: test, name: name, gid: gid }});
    },
    * deleteOne ({ payload }, { select, call, put }) {
      console.log('mock deleteOne payload');
      console.log(payload);
      yield call(mockService.deleteOne, payload);
      const user = yield select((state) => state.user);
      yield put({ type: 'queryList', payload: { ...user } });
    },
    * addOne ({ payload }, { select, call, put }) {
      console.log('mock addOne' + payload);
      console.log(payload);
      const rsp = yield call(mockService.addOne, payload);
      const user = yield select((state) => state.user);
      console.log(user);
      yield put({ type: 'queryList', payload: { ...user } });
      return rsp;
    },
    * updateOne ({ payload }, { select, call, put }) {
      console.log('mock update');
      console.log(payload);
      const rsp = yield call(mockService.updateOne, payload);
      const user = yield select((state) => state.user);
      console.log(user);
      yield put({ type: 'queryList', payload: { ...user } });
      return rsp;
    },
  },

  reducers: {
    saveList (state, { payload: { mockList, name, gid } }) {
      return {
        ...state,
        mockList,
        name,
        gid,
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
