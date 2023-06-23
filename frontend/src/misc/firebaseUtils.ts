import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Item } from "interfaces/interfaces";

export const saveToFirebase = async (item: Item) => {
  try {
    await addDoc(collection(firestore, "checkout"), item);
  } catch (error) {
    console.error("Failed to save item to Firebase:", error);
  }
};

export const removeFromFirebase = async (item: Item) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "checkout"));
    const documents = querySnapshot.docs;

    for (const document of documents) {
      const data = document.data() as Item;
      if (data.id === item.id) {
        await deleteDoc(doc(firestore, "checkout", document.id));
        break;
      }
    }
  } catch (error) {
    console.error("Failed to remove item from Firebase:", error);
  }
};

export const handleLike = async (
  event: React.MouseEvent<HTMLButtonElement>,
  item: Item
) => {
  try {
    const collectionRef = collection(firestore, "likedItems");
    await addDoc(collectionRef, item);
  } catch (error) {
    console.error("Error saving item in Firestore:", error);
  }
};

export const removeLikeFromFirebase = async (item: Item) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "likedItems"));
    const documents = querySnapshot.docs;

    for (const document of documents) {
      const data = document.data() as Item;
      if (data.id === item.id) {
        await deleteDoc(doc(firestore, "likedItems", document.id));
        break;
      }
    }
  } catch (error) {
    console.error("Failed to remove item from Firebase:", error);
  }
};
