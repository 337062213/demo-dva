import React from 'react';
import {Table, Form, Popconfirm, Tooltip} from 'antd';
import UserUpdate from './UserUpdate';
import styles from '../../index.css';
import Search from '../search/search';
import {download} from '../../utils/FileService';
import PropTypes from 'prop-types';
import jQuery from 'jquery';

class User extends React.Component {
  logfr = () => {
    var data = {
      username: 'admin',
      password: 'admin',
    };
    var url = 'http://localhost:8075/webroot/decision/login/cross/domain?fine_username=' + data.username + '&fine_password=' + data.password + '&validity=' + -1;
    jQuery.ajax({
      contentType: 'application/json',
      type: 'GET',
      url: url,
      timeout: 10000,
      dataType: 'jsonp',
      // data: JSON.stringify(data),
      success: function (res) {
        console.log(JSON.stringify(res));
        if (res.status) {
          window.alert(res.status);
        } else {
          window.alert(res.status);
        }
        // callback && callback(res.accessToken);
      },
      error: function (event) {
        if (event.status === 0 || event.statusText === 'timeout') {
          alert('服务器连接超时！' + event.status + ', ' + event.statusText);
        } else {
          alert('服务器超时或服务器其他错误' + event.status + ', ' + event.statusText);
        }
      },
      complete: function (event) {
        if (event.status === 200) {
          alert('服务成功调用完成！' + event.status + ', ' + event.statusText);
        } else if (event.status === 404) {
          alert('服务失败调用完成！未找到资源。' + event.status + ', ' + event.statusText);
        } else {
          alert('服务失败调用完成！' + event.status + ', ' + event.statusText);
        }
      },
    });
  }
  onfr = (values) => {
    document.getElementById('reportFrame').contentWindow.postMessage('_g().verifyAndWriteReport()', 'http://localhost:8075');
    window.addEventListener('message', function (event) {
      values.reportId = event.data.reportId;
      console.log(JSON.stringify(event.data));
    });
  }

  GetList = (token) => {
    let i = 0;
    jQuery.ajax({
      url: 'http://localhost:8075/v5/api/dashboard/user/info?op=api&cmd=get_all_reports_data&fine_auth_token=' + token,
      type: 'GET',
      timeout: 10000,
      dataType: 'jsonp',
      success: function (res) {
        for (i = 0;i < res.data.dashboards.length;i++) {
          document.write(JSON.stringify(res.data.dashboards[i].name) + '<br>');
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest + '/' + textStatus + '/' + errorThrown);
      },
    });
  }

  render () {
    const { userList, name, gid, onEdit, onAdd, onDelete, onSearch, onReset, onFlag, report } = this.props;
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
    const url = 'http://localhost:8075/webroot/decision/view/report?viewlet=声屏障检验批质量验收记录.cpt&op=write&__showtoolbar__=false&id=' + report.reportId;
    // const url = 'http://localhost:8075/webroot/decision/view/report?viewlet=声屏障检验批质量验收记录.cpt&op=write&__showtoolbar__=false&id=79ccbd3a-07ad-4879-8049-f575058789a6';
    // const url = 'http://10.0.10.220/FineReport/ReportServer?reportlet=jsbim-reportlets/QualityReport/孔隙水压力观测记录 (2).cpt&op=write';
    return (
      <div>
        <Search style={{float: 'right'}} record={ { name: name, gid: gid }} onAdd={ (values) => {onAdd(values);} } onSearch={ (values) => {onSearch(values);} } onReset={() => {onReset();}}>
        </Search>
        <Table columns={columns} dataSource={userList} rowKey="fid"
          pagination={{ pageSize: 14 } }
        />
        <iframe sandbox="allow-scripts allow-forms allow-same-origin" title='reportFrame' id='reportFrame' src={url} width = '100%' height = '800px'/>
        <button type='submit' onClick={() => {this.logfr();}}>登录FineReport</button>
        <button type='submit' onClick={() => {this.onfr(report);}}>登录FineReport.onfr</button>
        <button type='submit' onClick={() => {onFlag(report);}}>登录FineReport.onflag</button>
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
  onFlag: PropTypes.func.isRequired,
};

export default Form.create()(User);
