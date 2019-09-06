import { connect } from 'dva';
import SiderComponent from '../../components/firstPage/SiderComponent';
import React from 'react';
import PropTypes from 'prop-types';
class IndexRouter extends React.Component {

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
        <SiderComponent {...userPros} />
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
IndexRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(IndexRouter);
