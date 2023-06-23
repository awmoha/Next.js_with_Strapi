import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { fetchDataFromFirebase } from "services/api";
import AboutUsComponent from "./AboutUs";

import CartItemActions from "misc/AddAndRemoveCard";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);
  }, [dispatch]);

  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        gap={3}
        alignItems="center"
        borderBottomWidth="1px"
        flexWrap="wrap"
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        {data.length > 0 &&
          data.map((item, index) => (
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
                <CartItemActions item={item} index={index}  />
              </Card>
            </GridItem>
          ))}
      </Flex>

      <AboutUsComponent />
    </>
  );
};

export default Home;
