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
            <Menu.Item key="/list_of_students">
                <Link to={'/list_of_students'}>List of students</Link>
            </Menu.Item>
              <Menu.Item key="/list_of_courses">
                  <Link to={'/list_of_courses'}>List of courses</Link>
              </Menu.Item>
              <Menu.Item key="/create_course">
                  <Link to={'/create_course'}>Create new student</Link>
              </Menu.Item>
            <Menu.Item key="/create_student">
                <Link to={'/create_student'}>Create new course</Link>
            </Menu.Item>

          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '20px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 750 }}>
              {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>)
};

// @ts-ignore
export default withRouter(CustomLayout);