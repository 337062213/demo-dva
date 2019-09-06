import React from 'react';
import { Table, Button, Form, Popconfirm} from 'antd';
import ProductionModify from './ProductionModify';
import ProductionCreate from './productionCreate';
import Search from '../search/search';
import PropTypes from 'prop-types';

class Production extends React.Component {

  render () {

    const { productionList, name, gid, fid, onEdit, onAdd, onDelete, onSearch, onReset} = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'fid',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '住址',
        dataIndex: 'address',
      },
      {
        title: '组别',
        dataIndex: 'gid',
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            <ProductionModify record={record} onOk={ (values) => {onEdit(values);}}>
              <a href="">更新</a><br/>
            </ProductionModify>
            <Popconfirm title="确定删除吗?" onConfirm={ () => {onDelete(record.fid);}}>
              <a href="">删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <div>
        <ProductionCreate onOk={(values) => {onAdd(values);}}>
          <Button type='primary'>新建</Button>
        </ProductionCreate>
        <Search record={ { name: name, gid: gid, fid: fid }} onSearch={ (values) => {onSearch(values);} } onReset={() => onReset()} ></Search>
        <Table columns={columns} dataSource={productionList} rowKey="fid"
          pagination={{ pageSize: 10 } }
        />
      </div>
    );
  }
}
Production.propTypes = {
  record: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  userList: PropTypes.array.isRequired,
  productionList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  gid: PropTypes.string.isRequired,
  fid: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Form.create()(Production);
