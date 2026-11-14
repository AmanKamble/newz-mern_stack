import React from 'react';
import { Button, Flex } from 'antd';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiPenNibFill, RiUser3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.user);
  const location = useLocation();

  const items = [
    { url: 'createnews', icon: <RiAddCircleFill />, text: 'Create News', active: location.pathname === '/admin/createnews' },
    { url: 'news', icon: <RiEyeFill />, text: 'News', active: location.pathname === '/admin/news' },
  ];

  return (
    <Flex vertical gap={12} style={{ padding: 24, minWidth: 220 }}>
      {items.map((item) => (
        <Link to={`/admin/${item.url}`} key={item.url}>
          <Button type={item.active ? 'primary' : 'default'} icon={item.icon} block>
            {item.text}
          </Button>
        </Link>
      ))}
      {user && user.role === 'admin' && (
        <>
          <Link to="/admin/users">
            <Button type={location.pathname === '/admin/users' ? 'primary' : 'default'} icon={<RiUser3Fill />} block>
              Users
            </Button>
          </Link>
          <Link to="/admin/writerrequest">
            <Button type={location.pathname === '/admin/writerrequest' ? 'primary' : 'default'} icon={<RiPenNibFill />} block>
              Writer Requests
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Sidebar;