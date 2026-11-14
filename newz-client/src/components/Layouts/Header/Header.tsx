import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Flex, Space, Typography } from 'antd';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';

const { Text } = Typography;

const LinkButton = ({ url = '/', title = 'Home', active = false, onClose }: { url?: string; title?: string; active?: boolean; onClose: () => void }) => (
  <Link to={url}>
    <Button type={active ? 'primary' : 'text'} onClick={onClose} style={{ width: '100%', justifyContent: 'flex-start' }}>
      {title}
    </Button>
  </Link>
);

const Header = ({ isAuthenticated, user }: { isAuthenticated: boolean; user: any }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const onClose = () => setOpen(false);
  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<RiMenu5Fill />}
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 1001 }}
        className="primary-button"
      />

      <Drawer
        title={<span style={{ fontWeight: 800, fontSize: 22, letterSpacing: -1, color: '#222222' }}>New<span style={{ color: '#D71920' }}>Z</span></span>}
        placement="left"
        open={open}
        onClose={onClose}
        styles={{ body: { background: '#FFFFFF' }, header: { background: '#FFFFFF', borderBottom: '1px solid #E5E5E5' } }}
      >
        <Flex vertical gap={12} style={{ height: '100%' }}>
          <Flex vertical gap={8}>
            <LinkButton url="/" title="Home" active={location.pathname === '/'} onClose={onClose} />
            <LinkButton url="/aboutus" title="About Us" active={location.pathname === '/aboutus'} onClose={onClose} />
            <LinkButton url="/contactus" title="Contact Us" active={location.pathname === '/contactus'} onClose={onClose} />
            {isAuthenticated && user && user.role !== 'admin' && user.role !== 'writer' && (
              <LinkButton url="/sendwriterrequest" title="Send Writer Request" active={false} onClose={onClose} />
            )}
          </Flex>

          <Flex vertical gap={12} style={{ marginTop: 'auto' }}>
            {isAuthenticated ? (
              <>
                <Space>
                  <Link to="/profile">
                    <Button onClick={onClose}>Profile</Button>
                  </Link>
                  <Button danger onClick={logoutHandler} icon={<RiLogoutBoxLine />}>
                    Logout
                  </Button>
                </Space>
                {user && (user.role === 'admin' || user.role === 'writer') && (
                  <Link to="/admin/createnews">
                    <Button onClick={onClose} type="primary" icon={<RiDashboardFill />}>
                      Dashboard
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Space>
                <Link to="/login">
                  <Button onClick={onClose} type="primary">Login</Button>
                </Link>
                <Text>OR</Text>
                <Link to="/register">
                  <Button onClick={onClose}>Sign Up</Button>
                </Link>
              </Space>
            )}
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
};

export default Header;