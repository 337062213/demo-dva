import React from 'react';
import {Modal, Form, Table } from 'antd';
import PropTypes from 'prop-types';

class MockCheckFields extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = () => {
    this.setState({
      visible: true,
    });
  }

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  }

  render () {
    const { children } = this.props;
    const groupList = JSON.parse(sessionStorage.getItem('groupList'));
    const col = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'NAME', dataIndex: 'name' },
    ];
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="修改记录"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Table columns={col} dataSource={groupList} pagination={false} scroll={{ x: 800, y: 300 }}
            rowKey = {(record, index) => (index)}/>
        </Modal>
      </span>
    );
  }
}

MockCheckFields.propTypes = {
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default Form.create()(MockCheckFields);
