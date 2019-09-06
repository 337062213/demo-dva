import { connect } from 'dva';
import MockComponent from '../../components/mock/MockComponent';
import React from 'react';
import PropTypes from 'prop-types';

class MockRouter extends React.Component {

  render () {
    const { dispatch, mock } = this.props;
    const { mockList, name, gid } = mock;
    const mockPros = {
      mockList,
      name,
      gid,
      onEdit: (values) => {
        dispatch({
          type: 'mock/updateOne',
          payload: values,
        });
      },
      onAdd: (values) => {
        dispatch({
          type: 'mock/addOne',
          payload: values,
        });
      },
      onDelete: (values) => {
        dispatch({
          type: 'mock/deleteOne',
          payload: values,
        });
      },
      onSearch: (values) => {
        dispatch({
          type: 'mock/queryList',
          payload: values,
        });
      },

      onReset: () => {
        dispatch({
          type: 'mock/queryList',
        });
      },

    };

    return (
      <div>
        <MockComponent {...mockPros} />
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
    ...state,
    mock: state.mock,
  };
}
MockRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mock: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(MockRouter);
