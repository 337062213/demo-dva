import React from 'react';
import {Form, Input, Button, Select} from 'antd';
import UserCreate from '../user/UserCreate';
import {download, downloadPDF} from '../../utils/FileService';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;

class Search extends React.Component {

  handleSearch = () => {
    const { onSearch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  }

  handleCreate = (values) => {
    const { onAdd } = this.props;
    onAdd(values);
    this.props.form.resetFields();
  }

  handleReset = () => {
    const { onReset } = this.props;
    onReset();
    this.props.form.resetFields();
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { groupList } = this.props;
    const userCreateProps = {
      groupList,
    };
    const { name = []} = this.props.record;
    const results = groupList.map((group) => <Option key={group.id}>{group.groupName}</Option>);
    return (
      <div>
        <Form layout="inline"
          onSubmit={this.handleSearch}
        >
          <FormItem label={'姓名'}>
            {getFieldDecorator('name', {
              initialValue: name,
            })(
              <Input placeholder="请输入姓名搜索" />
            )}
          </FormItem>
          <FormItem label="组">
            {getFieldDecorator('gid')(
              <Select placeholder='请输入组别' style={{margin: '0 0 0 0', padding: '4px 11px', width: '250px', height: '32px', 'fontSize': '14px', 'lineHeight': '1.5'}}>
                {results}
              </Select>
            )}
          </FormItem>
          <div style={{ textAlign: 'right', float: 'right' }}>
            <div style={{float: 'left'}}>
              <UserCreate {...userCreateProps} onOk={this.handleCreate}>
                <Button type='primary'>新建</Button>
              </UserCreate>
            </div>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleSearch}>搜索</Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleReset}>重置</Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => download('http://localhost:8502/api/excel/get/user', '', '2003')}>导出2003</Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => download('http://localhost:8502/api/excel/get/user', '', '2007')}>导出2007</Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => downloadPDF('http://localhost:8502/api/pdf/get/pdf')}>导出pdf</Button>
          </div>
        </Form>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Form.create()(Search);

