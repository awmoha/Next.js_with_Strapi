import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  GridItem,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { addToFavourites, setFavItems } from "redux/favourites";
import { firestore } from "../../firebaseConfig";
import { RootState } from "redux/store";
import { Item } from "interfaces/interfaces";
import CartItemActions from "misc/AddAndRemoveCard";


const Favourites = () => {
    const favItems = useSelector((state : RootState) => state.favourites.FavItems);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFavourites = async () => {
          try {
            const querySnapshot = await getDocs(collection(firestore, "likedItems"));
            const items = querySnapshot.docs.map((doc) => doc.data() as Item);
            dispatch(setFavItems(items));
          } catch (error) {
            console.error("Error fetching favourite items:", error);
          }
        };
    
        fetchFavourites();
      }, [dispatch]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      gap={3}
      alignItems="center"
      borderBottomWidth="1px"
      flexWrap="wrap"
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      {favItems.length > 0 &&
        favItems.map((item : Item, index : number) => (
          <GridItem key={item.id}>
            <Card maxW="sm" mt="20vh">
              <CardBody>
                <Box h="30vh" overflow="hidden">
                  <Image
                    src={item.imageUrl}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                </Box>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{item.name}</Heading>
                  <Text>{item.desc}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    ${item.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CartItemActions item={item} index={index}  isFavoriteComponent={true}  />
            </Card>
          </GridItem>
        ))}
    </Flex>
  );
};

export default Favourites;
