import { db } from '../firebase'
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const updateFavourites = async (currentUser, favourites) => {
    try {
        const userCollectionRef = collection(db, 'users');
        const userDocRef = doc(userCollectionRef, currentUser.uid);
        const updatedFav = {
            favourites: favourites
        }
        await setDoc(userDocRef, updatedFav, { merge: true })
        console.log("Successfully added favourites")
    }
    catch (e) {
        console.log("error updating favourites : ", e)
    }
};

export const fetchFavourites = async (currentUser) => {
    try {
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        console.log(userDoc.data().favourites)
        if (userDoc.data().favourites?.length > 0) {
            return userDoc.data().favourites;
        }
        return [];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
