import React from 'react';
import { Layout as AntLayout } from 'antd';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AntLayout className="app-shell" style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <Header style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', padding: '0 24px', height: 64 }}>
        <span style={{ fontWeight: 800, fontSize: 28, letterSpacing: -1.5, color: '#222222' }}>
          New<span style={{ color: '#D71920' }}>Z</span>
        </span>
      </Header>
      <Content className="page-container">{children}</Content>
    </AntLayout>
  );
};

export default Layout;