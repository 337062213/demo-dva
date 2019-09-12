import React from 'react';
import {Table, Form, Popconfirm, Tooltip} from 'antd';
import UserUpdate from './UserUpdate';
import styles from '../../index.css';
import Search from '../search/search';
import PropTypes from 'prop-types';

class User extends React.Component {
  render () {
    const { userList, name, gid, onEdit, onAdd, onDelete, onSearch, onReset } = this.props;
    const groupList = JSON.parse(sessionStorage.getItem('groupList'));
    const columns = [
      { title: 'ID', dataIndex: 'fid', width: '21%', className: styles.center},
      { title: '姓名', dataIndex: 'name', width: '12.5%', className: styles.center},
      { title: '年龄', dataIndex: 'age', width: '4.5%', className: styles.center},
      { title: '性别', dataIndex: 'sex', width: '4.5%', className: styles.center},
      { title: '创建时间', dataIndex: 'creatTime', width: '8%', className: styles.center},
      { title: '修改时间', dataIndex: 'updateTime', width: '8%', className: styles.center},
      { title: '组别', key: 'gid', width: '12.5%', className: styles.center,
        render: (record) => {
          let groupname = groupList.filter((item) => item.id === record.gid)[0];
          if (groupname) {
            let title = groupname.groupName + ' ID 是' + groupname.id;
            return <span style={{cursor: 'pointer'}}><Tooltip placement='top' title={title}>{groupname.groupName}</Tooltip></span>;
          }
        },
      },
      { title: <span style={{display: 'table', margin: '0 auto'}}>地址</span>, dataIndex: 'address', width: '21%', className: styles.center,
        render: (text) => <div style={{width: '285px', textAlign: 'center'}}><div style={{cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          <Tooltip placement='top' title={text}>{text}</Tooltip></div></div>,
      },
      { title: '操作', key: 'operation', className: styles.center, width: '8%',
        render: (record) => (
          <div>
            <UserUpdate record={record} onOk={ (values) => {onEdit(values);}}>
              <a>更新</a><br/>
            </UserUpdate>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={ () => {onDelete(record.fid);}}>
              <a href="">删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];

    return (
      <div>
        <Search style={{float: 'right'}} record={ { name: name, gid: gid }} onAdd={ (values) => {onAdd(values);} } onSearch={ (values) => {onSearch(values);} } onReset={() => {onReset();}}>
        </Search>
        <Table columns={columns} dataSource={userList} rowKey="fid"
          pagination={{ pageSize: 14 } }
        />
      </div>
    );
  }
}

User.propTypes = {
  userList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  gid: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Form.create()(User);
