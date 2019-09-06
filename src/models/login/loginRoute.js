import * as loginService from '../../services/login';

export default {

  namespace: 'login',

  state: {
    isLogin: false,
  },

  effects: {
    
    * login ({ payload }, { call, put }) {
      const rsp = yield call(loginService.login, payload);
      console.log('loginService login');
      console.log(rsp);
      yield put({ type: 'loginR', payload: { loginData: rsp.data } });
    },

    * logout ({ call, put }) {
      console.log('loginService logout');
      yield call(loginService.logout());
      yield put({ type: 'logoutR' });
      return ;
    },
  },

  reducers: {
    loginR (state, { payload: { loginData } }) {
      const zero = 0;
      console.log('login success ? ' + (loginData.code === zero));
      let isLogin = false;
      if (loginData.code === zero) {
        isLogin = true;
        return {
          ...state,
          isLogin,
        };
      } else {
        return {
          ...state,
          isLogin,
        };
      }
    },
  },

  // subscriptions: {
  //   setup({ dispatch}){
  //     dispatch({
  //       type: 'queryList',
  //     });
  //   }
  // },
};
