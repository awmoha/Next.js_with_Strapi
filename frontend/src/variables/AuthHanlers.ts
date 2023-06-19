// AuthHandlers.ts

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setEmail, setPassword, clearForm, setUser, setIsLoggedIn, setError } from "redux/login-reducer";
import { useRouter } from "next/router";
import { auth } from "../../firebaseConfig";
import { setNewAccount } from "redux/login-reducer";

export const handleRegister = (email: string, password: string, dispatch: any, router: any) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(setEmail(email));
      dispatch(setPassword(password));
      dispatch(clearForm());
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    })
    .catch((error) => {
      dispatch(setError("Registrering misslyckades: " + error.message));
    });
};

export const handleLogin = (email: string, password: string, dispatch: any, router: any) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(setEmail(email));
      dispatch(setPassword(password));
      dispatch(clearForm());
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    })
    .catch((error) => {
      dispatch(setError("Inloggning misslyckades: " + error.message));
    });
};

export const handleLogout = (dispatch: any, router: any) => {
  signOut(auth)
    .then(() => {
      dispatch(setIsLoggedIn(false));
      dispatch(setUser(null));
      localStorage.removeItem("user");
      router.push("/");
    })
    .catch((error) => {
      console.log("Utloggning misslyckades: " + error.message);
    });
};

export const toggleForm = (dispatch: any, isNewAccount: boolean) => {
  dispatch(clearForm());
  dispatch(setError(""));
  dispatch(setNewAccount(!isNewAccount));
};
