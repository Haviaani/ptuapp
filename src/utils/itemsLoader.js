import { collection, getDocs } from "firebase/firestore"
import firebase from './firebase.js'

export const itemsLoader = async () => {
  try {
    const querySnapshot = await getDocs(collection(firebase, "itemdata"))
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return items
  } catch (error) {
    throw new Error("Tietojen haku epäonnistui.")
  }
};
