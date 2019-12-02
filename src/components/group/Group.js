import React from 'react';
import {Form, Table, Button, Popconfirm} from 'antd';
import GroupModify from './GroupModify';
import GroupCreate from './GroupCreate';
import PropTypes from 'prop-types';

class Group extends React.Component {

  render () {
    const { groupList, onEdit, onAdd, onDelete} = this.props;
    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '组名', dataIndex: 'groupName' },
      { title: '创建时间', dataIndex: 'creatTime' },
      { title: '更新时间', dataIndex: 'updateTime' },
      { title: '操作', key: 'operation',
        render: (record) => (
          <span>
            <GroupModify record={record} onOk={ (values) => {onEdit(values);}}>
              <a>Edit</a><br/>
            </GroupModify>
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={ () => {onDelete(record.id);}}>
              <a href="">Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <div>
        <GroupCreate record={groupList} onOk={(values) => {onAdd(values);} }>
          <Button type='primary'>新建</Button>
        </GroupCreate>
        <Table columns={columns} dataSource={groupList} rowKey="id"
          pagination={{ pageSize: 10 }}/>
      </div>
    );
  }
}

Group.propTypes = {
  groupList: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default Form.create()(Group);
