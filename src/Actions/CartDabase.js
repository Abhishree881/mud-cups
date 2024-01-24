import { db } from '../firebase'
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const updateCartDb = async (currentUser, newCart) => {
    try {
        const userCollectionRef = collection(db, 'users');
        const userDocRef = doc(userCollectionRef, currentUser.uid);
        const updatedData = {
            currentCart: newCart, // Update currentCart
        };
        await setDoc(userDocRef, updatedData, { merge: true });

        console.log('Cart updated successfully!');
    } catch (error) {
        console.error('Error updating cart:', error);
    }
};

export const fetchCartDb = async (currentUser) => {
    try {
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, currentUser.uid);
        const userDoc = await getDoc(userDocRef)
        let existingData = {};

        // Check if the user document exists
        if (userDoc.exists()) {
            existingData = userDoc.data();
        }
        console.log(existingData)
        return existingData.currentCart
    }
    catch (e) {
        console.log(e)
    }
}