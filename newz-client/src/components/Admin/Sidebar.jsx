import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <VStack spacing="8" p="16" boxShadow={"-2px 0 10px rgba(245, 8, 8, 0.5)"} >
      <LinkButton
        url="createcourse"
        Icon={RiAddCircleFill}
        text="Create Course"
        active={location.pathname === "/admin/createcourse"}
      />
      <LinkButton
        url="news"
        Icon={RiEyeFill}
        text="News"
        active={location.pathname === "/admin/news"}
      />
      <LinkButton
        url="users"
        Icon={RiUser3Fill}
        text="Users"
        active={location.pathname === "/admin/users"}
      />
    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`} >
      <Button colorScheme={active ? 'red' : 'black'} fontSize="large" variant="outline" >
        <Icon style={{ margin: "4px" }} /> {text}
      </Button>
    </Link>
  );
}
