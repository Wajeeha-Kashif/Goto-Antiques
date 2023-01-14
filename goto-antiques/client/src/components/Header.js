import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import "../style/style.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  DiffOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;
const LayoutApp = ({children}) => {
 

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggle =()=>{
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className='logo-title'>GOTO Antiques</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}  >
             <Menu.Item key='/home' icon={<HomeOutlined />}>
              <Link  to ="/home">Home</Link>
             </Menu.Item>
             
             <Menu.Item key='ttotalantiquesold' icon={<DollarOutlined/>}>
              <Link  to ="/totalantiquesold">Total Sales</Link>
             </Menu.Item>
             
             <Menu.Item key='/totalsales' icon={<HomeOutlined />}>
              <Link  to ="/totalsales">Total Antiques Sold</Link>
             </Menu.Item>
             
             <Menu.Item key='/iteminfo' icon={<DiffOutlined />}>
              <Link  to ="/iteminfo">Antqiue Details</Link>
             </Menu.Item>

           
             <Menu.Item key='/' icon={<LogoutOutlined />}>
             <Link  to ="/">Logout</Link>
             </Menu.Item>
          </Menu>
         
      </Sider>
      <Layout className="site-layout">
        
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;
