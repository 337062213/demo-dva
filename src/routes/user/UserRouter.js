import { connect } from 'dva';
import User from '../../components/user/User';
import React from 'react';
import PropTypes from 'prop-types';
class UserRouter extends React.Component {

  render () {
    const { dispatch, user } = this.props;
    const { userList, name, gid, report, groupList } = user;

    const userPros = {
      groupList,
      userList,
      name,
      gid,
      report,
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

      onFlag: (values) => {
        document.getElementById('reportFrame').contentWindow.postMessage('_g().verifyAndWriteReport()', 'http://localhost:8075');
        window.addEventListener('message', function (event) {
          values.reportId = event.data.reportId;
          values.iframeId = document.getElementById('reportFrame').id;
          console.log(JSON.stringify(event.data));
          dispatch({
            type: 'user/saveFlag',
            payload: values,
          });
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
