import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser, setEmail } from "../redux/login-reducer";
import { auth } from "../../firebaseConfig";
import { RootState } from "../redux/store";
import { useEffect } from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);
  const cartItemsNumber = useSelector(
    (state: RootState) => state.cart.cartItemsNumber
  );
  const { cartItems } = useSelector((state: RootState) => state.cart);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Användaren är inloggad
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(user));
        dispatch(setEmail(user.email || ""));
        // Uppdatera e-postadressen i Redux-tillståndet
      } else {
        // Användaren är utloggad
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        dispatch(setEmail("")); // Återställ e-postadressen i Redux-tillståndet
      }
    });

    // Avsluta prenumerationen när komponenten avmonteras
    return () => unsubscribe();
  }, []);

  
  return <>{children}</>;
}

export default RootLayout;
