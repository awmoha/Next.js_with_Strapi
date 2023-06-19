export interface AuthState {
  email: string;
  password: string;
  error: string;
  firstTwoLetters: string;
  user: any;
  isLoggedIn: boolean;
  isNewAccount: boolean;
}
export interface DataState {
  data: Item[];
  isLoading: boolean;
  error: string | null;
}

export interface Item {
  id: number;
  attributes: {
    name: string;
    desc: string;
    price: number;
    imageUrl: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface CartState {
  cartItems: any;
  cartItemsNumber: number;
}
