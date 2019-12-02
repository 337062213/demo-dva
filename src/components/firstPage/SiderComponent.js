
import { Layout, Menu, Breadcrumb, Icon, Row, Tabs, Switch } from 'antd';
import React from 'react';
import logo from '../../image/ico/internet/rss/rss_48px.ico';
import BarDiagram from '../diagram/BarDiagram';
import BarCalender from '../diagram/BarCalender';
import EchartsRadar from '../diagram/EchartsRadar';
import PropTypes from 'prop-types';
const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const SubMenu = Menu.SubMenu;

class SiderComponent extends React.Component {
  constructor () {
    super();
    this.newTabIndex = [0, 0, 0, 0, 0];
    const menus = [{key: 'top', type: 'smile', content: '头条'}, {key: 'shehui', type: 'star', content: '社会'}, {key: 'guonei', type: 'desktop', content: '国内'},
      {key: 'guoji', type: 'shopping-cart', content: '国际'}, {key: 'yule', type: 'like', content: '娱乐'}, {key: 'tiyu', type: 'aliwangwang-o', content: '体育'},
      {key: 'keji', type: 'mobile', content: '科技'}, {key: 'shishang', type: 'scan', content: '时尚'}];
    this.state = {
      theme: 'light',
      current: 'top',
      collapsed: false,
      mode: 'inline',
      activeKey: '',
      panes: [],
      menus: menus,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  /**
   * @param {String} title new tab title
   * @param {any} content new tab content
   * @param {String} activeKey new tab key
   * @returns {null} new one table window
   * */
  add = (title, content, activeKey) => {
    const { panes } = this.state;
    const keyprix = activeKey + this.newTabIndex[0]++;
    const titleprix = title + this.newTabIndex[1]++;
    panes.push({ title: titleprix, content: content, key: keyprix });
    this.setState({ panes, activeKey: keyprix });
  }

  toRouter = () => {
    const host = window.location.host;
    window.parent.postMessage(
      JSON.stringify({isAddRoute: true,
        name: 'user',
        route: 'http://' + host + '/#/user',
      }), '*'
    );
  }

  remove = (targetKey) => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.newTabIndex[0]--;
    this.newTabIndex[1]--;
    this.setState({ panes, activeKey });
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const data = {
      xdata: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      ydata: {
        ydata1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        ydata2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
    };
    const rediv1 = <BarDiagram data = {data} key={this.newTabIndex[3]++}/>;
    const rediv2 = <EchartsRadar data = {data} key={this.newTabIndex[2]++}/>;
    const rediv3 = <BarCalender data = {data} key={this.newTabIndex[3]++}/>;
    return (
      <Layout>
        <Sider
          theme={'light'}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Switch size={'small'} onChange={this.changeTheme} checkedChildren="暗" unCheckedChildren="亮" />
          <Menu theme={this.state.theme} mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" title={<span><Icon type="video-camera" /><span>导航一</span></span>}>
              <Menu.Item key="1"><Icon type="caret-right" /><span onClick={() => this.add('nav 1-', rediv1, 'nav 1')}>选项1</span></Menu.Item>
              <Menu.Item key="2"><Icon type="caret-right" /><span onClick={() => this.add('nav 2-', rediv2, 'nav 2')}>选项2</span></Menu.Item>
              <SubMenu key="sub1-1" title={<span><Icon type="camera-o" /><span>三级导航</span></span>}>
                <Menu.Item key="3"><Icon type="caret-right" /><span onClick={() => this.toRouter()}>选项3</span></Menu.Item>
                <Menu.Item key="4"><Icon type="caret-right" /><span onClick={() => this.add('nav 3-', rediv3, 'nav 3')}>选项4</span></Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
              <Menu.Item key="5"><Icon type="caret-right" /><span>选项5</span></Menu.Item>
              <Menu.Item key="6"><Icon type="caret-right" /><span>选项6</span></Menu.Item>
              <SubMenu key="sub2-1" title={<span><Icon type="user" /><span>三级导航</span></span>}>
                <Menu.Item key="7"><Icon type="caret-right" /><span>选项7</span></Menu.Item>
                <Menu.Item key="8"><Icon type="caret-right" /><span>选项8</span></Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="setting" /><span>导航三</span></span>}>
              <SubMenu key="sub3-1" title={<span><Icon type="user" /><span>三级导航</span></span>}>
                <Menu.Item key="9"><Icon type="caret-right" /><span>选项9</span></Menu.Item>
                <Menu.Item key="10"><Icon type="caret-right" /><span>选项10</span></Menu.Item>
                <Menu.Item key="11"><Icon type="caret-right" /><span>选项11</span></Menu.Item>
                <Menu.Item key="12"><Icon type="caret-right" /><span>选项12</span></Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="picture" /><span>导航四</span></span>}>
              <SubMenu key="sub2-1" title={<span><Icon type="user" /><span>三级导航</span></span>}>
                <Menu.Item key="13"><Icon type="caret-right" /><span>选项13</span></Menu.Item>
                <Menu.Item key="14"><Icon type="caret-right" /><span>选项14</span></Menu.Item>
              </SubMenu>
              <Menu.Item key="15"><Icon type="caret-right" /><span>选项15</span></Menu.Item>
              <Menu.Item key="16"><Icon type="caret-right" /><span>选项16</span></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#000', padding: 0 }}>
            <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{ cursor: 'pointer'}}
              />
            </span>
            <span style={{color: '#fff', paddingLeft: '2%', fontSize: '1.4em'}}>Information Management System</span>
            <span style={{color: '#fff', float: 'right', paddingRight: '1%'}}>
              <img src={logo} className="App-logo" alt="logo" />
            </span>
            <Row>
              <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                {this.state.menus.map((menu) => (
                  <Menu.Item key={menu.key}>
                    <span ><Icon type={menu.type} />{menu.content}</span>
                  </Menu.Item>
                ))}
              </Menu>
            </Row>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
              <Tabs
                hideAdd={true}
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
              >
                {this.state.panes.map((pane) => (
                  <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    {pane.content}
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
SiderComponent.propTypes = {
  userList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  gid: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
export default SiderComponent;
