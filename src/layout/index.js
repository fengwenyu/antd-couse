import {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';

const {Header, Footer, Sider, Content} = Layout;

const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span><Link to="/helloworld">欢迎页</Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="dashboard" /><span>看板</span></span>}
            >
                <Menu.Item key="2"><Link to="/dashboard/analysis">analysis</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/dashboard/monitor">monitor</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/dashboard/workplace">workplace</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/process">process</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
          <Content id={"mountNode"} style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ?2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}