import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"


const LinkButton = ({ url = "/", title = "Home", onClose }) => (
  <Link to={url} >
    <Button onClick={onClose} variant={"outline"} colorScheme='red'>{title}</Button>
  </Link>
)


const Header = ({isAuthenticated}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = {
    role: "user"
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
              <LinkButton url="/" title="Home" onClose={onClose} />
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
                            <Button variant="ghost" colorScheme='red'  >
                              <RiLogoutBoxLine style={{ margin: '4px' }} />
                              Logout
                            </Button>
                          </HStack>
                          {
                            user && (user.role === "admin" || user.role === "writer") && <Link to="/admin/dashboard" >
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