import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setIsLoggedIn,
  setEmail,
  setPassword,
} from "redux/login-reducer";
import { RootState } from "redux/store";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  handleRegister,
  handleLogin,
  handleLogout,
  toggleForm,
} from "variables/AuthHanlers";

const Login = () => {
  const dispatch = useDispatch();
  const { email, password, error, isNewAccount, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !isLoggedIn) {
      dispatch(setUser({ uid: JSON.parse(storedUser) }));
      dispatch(setIsLoggedIn(true));
    }
  }, [isLoggedIn]);

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>E-postadress</FormLabel>
          <Input
            type="email"
            placeholder="E-postadress"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Lösenord</FormLabel>
          <Input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </FormControl>

        {error && (
          <Box color="red.500" fontSize="sm">
            {error}
          </Box>
        )}

        {isLoggedIn ? (
          <Button
            colorScheme="teal"
            onClick={() => handleLogout(dispatch, router)}
          >
            Sign out
          </Button>
        ) : isNewAccount ? (
          <>
            <Button
              colorScheme="teal"
              onClick={() => handleRegister(email, password, dispatch, router)}
            >
              Registrera
            </Button>

            <Text
              color="blue.500"
              cursor="pointer"
              onClick={() => toggleForm(dispatch, isNewAccount)}
            >
              Har du redan ett konto? Logga in här.
            </Text>
          </>
        ) : (
          <>
            <Button
              colorScheme="teal"
              onClick={() => handleLogin(email, password, dispatch, router)}
            >
              Sign in
            </Button>

            <Text
              color="blue.500"
              cursor="pointer"
              onClick={() => toggleForm(dispatch, isNewAccount)}
            >
              Skapa ett nytt konto?
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Login;
