import {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon,} from 'antd';
// import Link from 'umi/link';
import {Router, Route, BrowserRouter, Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import './layout.css'
const {Header, Footer, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
// const { SubMenu } = Menu;

export default class BasicLayout extends React.Component {
    state = {
        collapsed: false,
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render(){
        return (<Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">工作台</Menu.Item>
                    <Menu.Item key="2">生产</Menu.Item>
                    <Menu.Item key="3">商品</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />DEMO菜单</span>}>
                                <Menu.Item key="g1_1"><Link to="/dashboard/analysis">analysis</Link></Menu.Item>
                                <Menu.Item key="g1_2"><Link to="/dashboard/monitor">monitor</Link></Menu.Item>
                                <Menu.Item key="g1_3"><Link to="/dashboard/workplace">workplace</Link></Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />加工管理</span>}>
                                <Menu.Item key="g2_3"><Link to="/process">配置管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>)
    }
}

ReactDOM.render(<BrowserRouter><BasicLayout/></BrowserRouter>, document.getElementById('root'));