import { connect } from 'dva';
import Production from '../../components/production/production';
import React from 'react';
import PropTypes from 'prop-types';

class ProductionRoute extends React.Component {

  render () {

    const { dispatch, productionModel } = this.props;
    const { productionList, name, gid, fid } = productionModel;
    const productionPros = {
      productionList,
      name,
      gid,
      fid,
      onEdit: (values) => {
        dispatch({
          type: 'productionModel/updateOne',
          payload: values,
        });
      },

      onAdd: (values) => {
        dispatch({
          type: 'productionModel/addOne',
          payload: values,

        });
      },

      onDelete: (values) => {
        dispatch({
          type: 'productionModel/deleteOne',
          payload: values,
        });
      },

      onSearch: (values) => {
        dispatch({
          type: 'productionModel/queryList',
          payload: values,
        });
      },

      onReset: () => {
        dispatch({
          type: 'productionModel/queryList',
        });
      },

    };

    return (
      <div>
        <Production {...productionPros} />
      </div>
    );
  }
}

/**
 * ignore
 * @returns{null} void
 * @param {*} state model
 * */
function mapStateToProps ({productionModel}) {
  return {productionModel};
}

ProductionRoute.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productionModel: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ProductionRoute);
