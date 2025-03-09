import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import firebase from './firebase.js'

const useFirestoreData = (collectionName) => {
    const [data, setData] = useState([])
  
    const firestore = getFirestore(firebase)
  
    useEffect(() => {
        const unsubscribe = onSnapshot(
          collection(firestore, collectionName),
          (snapshot) => {
            const newData = []
            snapshot.forEach((doc) => {
              newData.push({ ...doc.data(), id: doc.id })
            })
            setData(newData);
          }
        )
      
        return () => {
          unsubscribe()
        }
      }, [firestore, collectionName])
  
    return [data, setData] 
  }
  
  export default useFirestoreData