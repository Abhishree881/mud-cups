import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchFranchiseDatabase = async () => {
  let array = [];
  const collectionRef = await getDocs(collection(db, "franchise"));
  collectionRef.forEach((doc) => {
    array.push(doc.data());
  });
  return array;
};
