// import {
//     Box,
//     Button,
//     ButtonGroup,
//     Card,
//     CardBody,
//     CardFooter,
//     Divider,
//     Flex,
//     GridItem,
//     Heading,
//     Image,
//     Stack,
//     Text,
//   } from "@chakra-ui/react";
//   import React, { useEffect, useState } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { RootState } from "redux/store";
//   import { fetchDataFromFirebase } from "services/api";
//   import { appConfig } from "services/config";
//   import AboutUsComponent from "./AboutUs";
//   import { addToCart, removeFromCart } from "redux/cartSlice";
//   import { Item } from "interfaces/interfaces";
//   import FirebaseData from "./firebaseData";

//   const Home = () => {
//     const dispatch = useDispatch();
//     const [show, setShow] = useState(false);
//     const [showItemIndex, setShowItemIndex] = useState<number | null>(null);

//     const showAddAndRemove = (index: number) => {
//       setShowItemIndex(index);
//       setShow(!show);
//     };

//     const { data, isLoading, error } = useSelector(
//       (state: RootState) => state.data
//     );
//   console.log(data);

//     const { cartItems } = useSelector((state: RootState) => state.cart);

//     const handleAddToCart = (item: Item) => {
//       dispatch(addToCart(item));
//     };
//     const handleRemoveFromCart = (item: Item) => {
//       dispatch(removeFromCart(item));
//     };

//     useEffect(() => {
//       dispatch(fetchDataFromFirebase() as any);
//     }, [dispatch]);

//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     return (
//       <>
//         <Flex
//           ml={{ base: 0, md: 60 }}
//           px={{ base: 4, md: 4 }}
//           gap={3}
//           alignItems="center"
//           borderBottomWidth="1px"
//           flexWrap="wrap"
//           justifyContent={{ base: "center", md: "flex-start" }}
//         >
//           {data.length > 0 &&
//             data.map((item, index) => (
//               <GridItem key={item.id}>
//                 <Card maxW="sm" mt="20vh">
//                   <CardBody>
//                     <Box h="30vh" overflow="hidden">
//                       <Image
//                         src={`${appConfig.apiURL}${item.attributes.imageUrl?.data[0]?.attributes?.url}`}
//                         alt="Green double couch with wooden legs"
//                         borderRadius="lg"
//                       />
//                     </Box>
//                     <Stack mt="6" spacing="3">
//                       <Heading size="md">{item.attributes.name}</Heading>
//                       <Text>{item.attributes.desc}</Text>
//                       <Text color="blue.600" fontSize="2xl">
//                         ${item.attributes.price}
//                       </Text>
//                     </Stack>
//                   </CardBody>
//                   <Divider />
//                   <CardFooter>
//                     <ButtonGroup spacing="2">
//                       <Button variant="solid" colorScheme="blue">
//                         Buy now
//                       </Button>
//                       <Button
//                         onClick={() => showAddAndRemove(index)}
//                         variant="ghost"
//                         colorScheme="blue"
//                       >
//                         Add to cart
//                       </Button>
//                       {show && showItemIndex === index && (
//                         <Flex gap={3}>
//                           <Button onClick={() => handleRemoveFromCart(item)}>
//                             -
//                           </Button>
//                           <Button onClick={() => handleAddToCart(item)}>+</Button>
//                         </Flex>
//                       )}
//                     </ButtonGroup>
//                   </CardFooter>
//                 </Card>
//               </GridItem>
//             ))}

//         </Flex>

//         <AboutUsComponent />
//       </>
//     );
//   };

//   export default Home;
