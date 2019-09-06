import { connect } from 'dva';
import React from 'react';
import Login from '../../components/login/login';

class LoginRoute extends React.Component {
  render () {
    const { dispatch } = this.props;
    const loginPros = {
      isLogin: false,
      onLogin: (values) => {
        dispatch({
          type: 'login/login',
          payload: values,
        });
      },

      onLogout: () => {
        dispatch({
          type: 'login/logout',
        });
      },
    };

    return (
      <div>
        <Login {...loginPros}/>
      </div>
    );
  }
}

/**
 *@description map state to model props
 *@param {object} state state
 *@return {void}  nothing
 *
*/
function mapStateToProps (state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(LoginRoute);

