import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleLike,
  removeFromFirebase,
  removeLikeFromFirebase,
  saveToFirebase,
} from "./firebaseUtils";
import { addToCart, removeFromCart } from "redux/cartSlice";
import { Item } from "interfaces/interfaces";
import {
  Button,
  ButtonGroup,
  CardFooter,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { addToFavourites, removeFromFavourites } from "redux/favourites";

interface CartItemActionsProps {
  item: Item;
  index: number;
  isFavoriteComponent: boolean;
}

const CartItemActions: React.FC<CartItemActionsProps> = ({
  item,
  index,
  isFavoriteComponent,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [showItemIndex, setShowItemIndex] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    saveToFirebase(item);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
    removeFromFirebase(item);
  };
  const showAddAndRemove = () => {
    setShowItemIndex(index);
    setShow(!show);
  };
  const handleLikeClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      if (isFavoriteComponent) {
        // Remove logic
        dispatch(removeFromFavourites(item));
        await removeLikeFromFirebase(item);
      } else {
        // Like logic
        dispatch(addToFavourites(item));
        await handleLike(event, item);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <CardFooter>
      <ButtonGroup spacing="7">
        <Button onClick={showAddAndRemove} variant="ghost" colorScheme="blue">
          Add to cart
        </Button>

        {show && showItemIndex === index && (
          <Flex gap={3}>
            <Button onClick={handleRemoveFromCart}>-</Button>
            <Button onClick={handleAddToCart}>+</Button>
          </Flex>
        )}
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          onClick={handleLikeClick}
          icon={
            isFavoriteComponent ? (
              liked ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )
            ) : (
              <AiOutlineLike />
            )
          }
        />
      </ButtonGroup>
    </CardFooter>
  );
};

export default CartItemActions;
