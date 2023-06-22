import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDescription, setImage, setName, setPrice } from "redux/postReducer";
import { RootState } from "redux/store";
import { firestore } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Admin = () => {
  const dispatch = useDispatch();
  const { name, description, price, imageUrl } = useSelector(
    (state: RootState) => state.post
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      dispatch(setName(value));
    } else if (name === "description") {
      dispatch(setDescription(value));
    } else if (name === "price") {
      dispatch(setPrice(Number(value)));
    } else if (name === "image") {
      dispatch(setImage(value));
    }
  };
  const handleAddProduct = async () => {
    try {
      const productData = { name, description, price, imageUrl };
      const collectionRef = collection(firestore, "posts");
      await addDoc(collectionRef, productData);
      dispatch(setName(""));
      dispatch(setDescription(""));
      dispatch(setPrice(0));
      dispatch(setImage(""));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.error("Fel vid tillägg av produkt i Firestore:", error);
    }
  };

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
      <Heading mt="15vh" as="h2" size="xl">
        Create a new post
      </Heading>
      <Flex direction="row" justifyContent="space-between">
        <Box>
          <form>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleInputChange}
              />
              {!name && (
                <FormHelperText color="red">Name is required</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={description}
                placeholder="Description"
                onChange={handleInputChange}
              />
              {!description && (
                <FormHelperText color="red">
                  Description is required
                </FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                onChange={handleInputChange}
              />
              {!price && (
                <FormHelperText color="red">Price is required</FormHelperText>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                name="image"
                value={imageUrl}
                placeholder="Image"
                onChange={handleInputChange}
              />
              {!imageUrl && (
                <FormHelperText color="red">Image is required</FormHelperText>
              )}
            </FormControl>

            <Button onClick={handleAddProduct}>Submit</Button>

            {showSuccessMessage && (
              <Box mt={4}>
                <Text>Mission Complete</Text>
              </Box>
            )}
          </form>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Admin;
