import React from 'react';
import {Form, Table, Popconfirm} from 'antd';
import PropTypes from 'prop-types';
import MockUpdate from './MockUpdate';
import MockCreate from './MockCreate';

class MockComponent extends React.Component {

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  render () {
    const { mockList, onEdit, onAdd, onDelete } = this.props;
    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'sex' },
      { title: '地址', dataIndex: 'address' },
      { title: '手机号', dataIndex: 'mobile' },
      { title: '创建日期', dataIndex: 'created_at' },
      { title: '操作', key: 'operation',
        render: (record) => (
          <span>
            <div>
              <MockCreate record={record.uid} onOk={ (values) => {onAdd(values);}}>
                <a>新建</a><br/>
              </MockCreate>
            </div>
            <div>
              <MockUpdate record={record} onOk={ (record) => {onEdit(record);}}>
                <a>更新</a><br/>
              </MockUpdate>
              <Popconfirm
                title="确定删除吗?"
                record={record.uid}
                onConfirm={ () => {onDelete(record);}}>
                <a>删除</a>
              </Popconfirm>
            </div>
          </span>
        ),
      },
    ];
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Table rowSelection={mockList.length ? rowSelection : null} rowKey = {(index) => (index)}
          columns={columns} dataSource={mockList}
          pagination={{ pageSize: 8 }} onRowClick={this.onRowClick}/>
      </div>
    );
  }
}

MockComponent.propTypes = {
  mockList: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default Form.create()(MockComponent);
