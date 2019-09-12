import { connect } from 'dva';
import User from '../../components/user/User';
import React from 'react';
import PropTypes from 'prop-types';
class UserRouter extends React.Component {

  render () {
    const { dispatch, user } = this.props;
    const { userList, name, gid } = user;

    const userPros = {
      userList,
      name,
      gid,
      onEdit: (values) => {
        dispatch({
          type: 'user/updateOne',
          payload: values,
        });
      },
      onAdd: (values) => {
        dispatch({
          type: 'user/addOne',
          payload: values,
        });
      },
      onDelete: (values) => {
        dispatch({
          type: 'user/deleteOne',
          payload: values,
        });
      },
      onSearch: (values) => {
        dispatch({
          type: 'user/queryList',
          payload: values,
        });
      },

      onReset: () => {
        dispatch({
          type: 'user/queryList',
        });
      },

    };

    return (
      <div>
        <User {...userPros} />
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
    user: state.user,
  };
}
UserRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(UserRouter);
