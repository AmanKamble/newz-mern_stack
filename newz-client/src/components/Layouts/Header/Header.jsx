import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"
import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';


const LinkButton = ({ url = "/", title = "Home", active, onClose }) => (
  <Link to={url} >
    <Button onClick={onClose} variant={active ? "solid" : "ghost"} colorScheme={active ? 'red' : 'black'}>{title}</Button>
  </Link>
)


const Header = ({ isAuthenticated, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  }
  return (
    <>
      <Button onClick={onOpen} zIndex='overlay' colorScheme='red' width="12" height="12" rounded="full" position="fixed" top="3" left="4">
        <RiMenu5Fill />
      </Button>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay backdropFilter={"blur(2px)"} />
        <DrawerContent >
          <DrawerHeader children="NewZ" bg={"#d60f3a"} color={"white"} borderBottomWidth={"1px"} />
          <DrawerBody >
            <VStack spacing={"4"} alignItems={"flex-start"}>
              <LinkButton
                url="/"
                title="Home"
                active={location.pathname === "/"}
                onClose={onClose}
              />
              <LinkButton
                url="/aboutus"
                title="About Us"
                active={location.pathname === "/aboutus"}
                onClose={onClose}
              />
              <LinkButton
                url="/contactus"
                title="Contact Us"
                active={location.pathname === "/contactus"}
                onClose={onClose}
              />
              {
                isAuthenticated && user && user.role !== "admin" && user.role !== "writer" && (
                  <LinkButton url="/sendwriterrequest" title="Send Writer Request" onClose={onClose} />
                )
              }
              <HStack justifyContent="space-evenly" position="absolute" bottom="2rem" width="80%" >
                {
                  isAuthenticated ?
                    (
                      <>
                        <VStack >
                          <HStack>
                            <Link to="/profile">
                              <Button onClick={onClose} variant="ghost" colorScheme='green' >Profile</Button>
                            </Link>
                            <Button variant="ghost" colorScheme='red' onClick={logoutHandler}  >
                              <RiLogoutBoxLine style={{ margin: '4px' }} />
                              Logout
                            </Button>
                          </HStack>
                          {
                            user && (user.role === "admin" || user.role === "writer") && <Link to="/admin/createnews" >
                              <Button onClick={onClose} colorScheme='yellow' variant="ghost" >
                                < RiDashboardFill style={{ margin: '4px' }} />
                                Dasboard
                              </Button>
                            </Link>
                          }
                        </VStack>
                      </>
                    )
                    :
                    (
                      <>
                        <Link to="/login">
                          <Button onClick={onClose} colorScheme='red' >Login</Button>
                        </Link>
                        <p>OR</p>
                        <Link to="/register">
                          <Button onClick={onClose} colorScheme='red' >Sign Up</Button>
                        </Link>

                      </>
                    )
                }
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header