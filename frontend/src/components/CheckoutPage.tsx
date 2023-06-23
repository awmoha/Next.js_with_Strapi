import React, { useEffect, useRef, useState } from "react";
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
  Spacer,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { RootState } from "redux/store";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { setCartItems } from "redux/cartSlice";
import { Item } from "interfaces/interfaces";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const leastDestructiveRef = useRef(null);

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

  const handleDeleteConfirmation = (item: Item) => {
    setSelectedItem(item);
    setIsConfirmationOpen(true);
  };

  const handleDeleteItem = async () => {
    if (selectedItem) {
      try {
        const querySnapshot = await getDocs(collection(firestore, "checkout"));
        const documents = querySnapshot.docs;

        for (const document of documents) {
          const data = document.data() as Item;
          if (data.id === selectedItem.id) {
            await deleteDoc(doc(firestore, "checkout", document.id));
            const updatedItems = cartItems.filter(
              (item: Item) => item.id !== selectedItem.id
            );
            dispatch(setCartItems(updatedItems));

            window.location.reload();

            break;
          }
        }
      } catch (error) {
        console.error("Failed to remove item from Firebase:", error);
      }
    }

    setSelectedItem(null);
    setIsConfirmationOpen(false);
  };

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
        {cartItems.map((item: any, index: any) => (
          <Flex key={index} alignItems="center" mt="5vh" mb="4vh">
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
            <Box>
              <Text color="white">{item.name}</Text>
            </Box>
            <Spacer />
            <Box onClick={() => handleDeleteConfirmation(item)}>
              <AiFillDelete />
            </Box>{" "}
          </Flex>
        ))}
        <Text fontSize="lg" fontWeight="bold" mt={4}>
          Total Price: ${totalPrice}
        </Text>
      </Box>
      <Button>Checkout</Button>
      <AlertDialog
        leastDestructiveRef={leastDestructiveRef}
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure you want to delete this item?
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => setIsConfirmationOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteItem} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Grid>
  );
};

export default CheckoutPage;
