import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

export interface LayoutProps {
  children: React.ReactNode,
    location: Object,
}

const { Header, Content, Footer } = Layout;
const CustomLayout = (props: LayoutProps) => {
    return (<Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
                // @ts-ignore
            defaultSelectedKeys={[props.location.pathname]}
                            // @ts-ignore
            selectedKeys={[props.location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/signin">
                <Link to={'/signin'}>Sign in</Link>
            </Menu.Item>
            <Menu.Item key="/signup">
                <Link to={'/signup'}>Sign up</Link>
            </Menu.Item>
            <Menu.Item key="/list">
                <Link to={'/list'}>List of friends</Link>
            </Menu.Item>
            <Menu.Item key="/create">
                <Link to={'/create'}>Create new friend</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '20px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>)
};

// @ts-ignore
export default withRouter(CustomLayout);