import { connect } from 'dva';
import React from 'react';
import GroupComponent from '../../components/group/GroupComponent';
import PropTypes from 'prop-types';
class GroupRouter extends React.Component {
  render () {
    const { dispatch, groupModel } = this.props;
    const { groupList } = groupModel;
    const groupPros = {
      groupList,
      onEdit: (values) => {
        dispatch({
          type: 'groupModel/updateOne',
          payload: values,
        });
      },
      onAdd: (values) => {
        dispatch({
          type: 'groupModel/addOne',
          payload: values,

        });
      },
      onDelete: (values) => {
        dispatch({
          type: 'groupModel/deleteOne',
          payload: values,
        });
      },
    };
    return (
      <div>
        <GroupComponent {...groupPros}/>
      </div>
    );
  }
}

/**
 *@description map state to model props
 *@param {object} state all registried model
 *@return {groupModel}  nothing
 *
*/
function mapStateToProps (state) {
  return {groupModel: state.groupModel};
}
GroupRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groupModel: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(GroupRouter);
