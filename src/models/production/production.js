import * as productionService from '../../services/production/production';
import * as groupService from '../../services/group/group';

export default {

  namespace: 'productionModel',

  state: {
    productionList: [],
    name: [],
    gid: [],
    fid: [],
  },

  // 异步操作
  effects: {

    // 必须带星号，generator生成器
    * queryList ({ payload = [] }, { call, put }) {
      const {gid = [], name = [], fid = []} = payload;
      const rsp = yield call(productionService.queryList, name, gid, fid);
      console.log('queryProductionList');
      console.log(rsp.data);
      const rsp1 = yield call(groupService.queryList);
      console.log('queryGroupList');
      console.log(rsp1.data);
      yield sessionStorage.setItem('groupList', JSON.stringify(rsp1.data));
      yield put({ type: 'saveList', payload: { productionList: rsp.data, name: rsp.data.name, gid: rsp.data.gid, fid: fid }});
    },
    * deleteOne ({ payload }, { select, call, put }) {
      console.log('deleteOne');
      console.log(payload);
      yield call(productionService.deleteOne, payload);
      // select 函数 用于从state里获取数据
      const production = yield select((state) => state.productionModel);
      console.log(production);
      yield put({ type: 'queryList', payload: { ...production } });
    },
    * addOne ({ payload }, { select, call, put }) {
      console.log('addOne');
      console.log(payload);
      // 调用异步逻辑
      const rsp = yield call(productionService.addOne, payload);
      console.log(rsp.data);
      const production = yield select((state) => state.productionModel);
      console.log(production);
      const rsp2 = yield call(productionService.queryList, [], [], rsp.data.fid);
      yield put({ type: 'saveList', payload: { productionList: rsp2.data } });
      return rsp2;
    },
    * updateOne ({ payload }, { call, put }) {
      console.log('updateOne');
      console.log(payload);
      const rsp = yield call(productionService.updateOne, payload);
      console.log(rsp.data);
      const rsp2 = yield call(productionService.queryList, [], [], rsp.data.fid);
      // 触发 action
      yield put({ type: 'saveList', payload: { productionList: rsp2.data } });
      return rsp2;
    },
  },

  reducers: {
    // 定义 action 唯一可以修改state 数据的地方
    saveList (state, { payload: { productionList, name, gid, fid } }) {
      return {
        ...state,
        productionList,
        name,
        gid,
        fid,
      };
    },
  },
  subscriptions: {
    // 订阅一个数据源
    setup ({ dispatch }) {
      dispatch({
        type: 'queryList',
      });
    },
  },
};
