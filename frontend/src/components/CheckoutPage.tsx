import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Badge,
  Text,
  Grid,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";
import { AiFillShopping } from "react-icons/ai";
import { RootState } from "redux/store";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { selectCartItems, setCartItems } from "redux/cartSlice";
import { Item } from "interfaces/interfaces";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "checkout"));
        const items = querySnapshot.docs.map((doc) => doc.data() as Item);
        dispatch(setCartItems(items));
      } catch (error) {
        console.error("Failed to fetch cart items from Firebase:", error);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  const totalPrice = cartItems.reduce((total: any, item: any) => {
    return total + item.price;
  }, 0);
  return (
    <Grid
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      gap="5vh"
      alignItems="center"
      borderBottomWidth="1px"
      flexWrap="wrap"
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <Box p={4} borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Varukorg
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading mt="15vh" as="h2" size="xl">
            Checkout
          </Heading>
        </Flex>
        {cartItems.map((item: any) => (
          <Flex key={item.id} alignItems="center" mt="5vh" mb="4vh">
            <Box
              bg="gray.200"
              w="5vw"
              h="8vh"
              borderRadius="md"
              marginRight={2}
            >
              <Image
                boxSize="100%"
                objectFit="cover"
                src={item.imageUrl}
                alt="Dan Abramov"
              />
            </Box>
            <Text color="white">{item.name}</Text>
          </Flex>
        ))}
        <Text fontSize="lg" fontWeight="bold" mt={4}>
          Total Price: ${totalPrice}
        </Text>
      </Box>
      <Button>Checkout</Button>
    </Grid>
  );
};

export default CheckoutPage;
