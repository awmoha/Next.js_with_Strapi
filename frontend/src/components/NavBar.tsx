import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  Badge,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ReactText, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { handleLogout } from "variables/AuthHanlers";
import { useRouter } from "next/router";
import { selectCartItems, setCartItemsLength } from "redux/cartSlice";
import { AiFillShopping } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

interface SidebarWithHeaderProps {
  children?: ReactNode;
}
export default function SidebarWithHeader({
  children,
}: SidebarWithHeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, path: "/" },
    { name: "Admin", icon: FiTrendingUp, path: "/admin" },
    { name: "Checkout", icon: FiCompass, path: "/checkout" },
    { name: "Favourites", icon: FiStar, path: "/favourites" },
    { name: "Settings", icon: FiSettings, path: "/settings" },
    {
      name: isLoggedIn ? "Sign out" : "Sign in",
      icon: isLoggedIn ? FiLogOut : FiLogIn,
      path: "/Login",
    },
  ];
  return (
    <Box pos="fixed" transition="3s ease" w="full">
      <SidebarContent
        onClose={() => onClose}
        LinkItems={LinkItems}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} LinkItems={LinkItems} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 0 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  LinkItems: Array<LinkItemProps>;
}
const SidebarContent = ({ onClose, LinkItems, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}
const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <Link
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const firstTwoLetters = useSelector(
    (state: RootState) => state.auth.firstTwoLetters
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const fetchCartItemsLength = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "checkout"));
      const cartItemsLength = querySnapshot.size; // Get the size of the query snapshot
      // Dispatch an action to set the cartItemsLength in the Redux store
      dispatch(setCartItemsLength(cartItemsLength));
    } catch (error) {
      console.error("Failed to fetch cart items length from Firebase:", error);
    }
  };
  const selectCartItemsLength = (state: RootState) => state.cart.cartItemsNumber;
  const cartItemsLength = useSelector(selectCartItemsLength);


  useEffect(() => {
    fetchCartItemsLength();
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <HStack>
          {cartItemsLength > 0 && (
            <Flex
              alignItems="center"
              justifyContent={{ base: "space-between", md: "flex-end" }}
            >
              <Badge>{cartItemsLength} </Badge> <AiFillShopping />
            </Flex>
          )}
        </HStack>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm"> {firstTwoLetters}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>
                {isLoggedIn ? (
                  <div onClick={() => handleLogout(dispatch, router)}>
                    Sign out
                  </div>
                ) : (
                  <div>
                    <Link href="/Login">Sign in</Link>
                  </div>
                )}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
