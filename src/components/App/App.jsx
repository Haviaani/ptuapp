import React from 'react'
import './App.css'
import AppRouter from '../AppRouter'
import Login from '../Login'
import useLocalStorage from '../../utils/useLocalStorage.js'
import useFirestoreData from '../../utils/useFirestoreData.js'
import firebase, {auth} from '../../utils/firebase.js'
import { deleteDoc, doc, getFirestore, setDoc} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import bcrypt from 'bcryptjs'

function App() {

  // Localdatan "tyhjät" arvot.

  const initialdata = {
    signin: 0,
    nameid: -1,
    loginid: -1,
    loginname: "",
    password: "",
    name: "",
    newpw1: "",
    newpw2: "",
    accesslevel: 1,
  }
  
  // Localdata toimii paikallisesti ja pitää kirjauksen. Muut datat firestoressa.

  const [localdata, setLocaldata, resetLocaldata] = useLocalStorage('localdata', initialdata);

  const [itemdata, setItemdata] = useFirestoreData('itemdata')

  const [userdata, setUserdata] = useFirestoreData('userdata')

  const [inOutData, setInOutData] = useFirestoreData('inOutData')

  const [placedata, setPlacedata] = useFirestoreData('placedata')

  const [commentdata, setCommentdata] = useFirestoreData('commentdata')

  const firestore = getFirestore(firebase)

  // Tallentaa muualla päivitetyt localdatat.

  const handleLocaldata = (newlocaldata) => {
    setLocaldata(newlocaldata)
  }

  // Tallentaa uuden salasanan suolaamisen ja suojauksen kera.

  const handlePassword = async (newlocaldata) => {
    setLocaldata(newlocaldata)
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(localdata.password, salt)
    let x = localdata.nameid
    let newuserdata = JSON.parse(JSON.stringify(userdata[x]))
    newuserdata.password = hashPassword
    handleUserSubmit(newuserdata)
  }

  // Kirjaa käyttäjän ulos tyhjentämällä localdatan. Varmistaa ensin, että
  // käyttäjätiedot ovat ajantasalla.

  const handleReset = async () => {
    let newuserdata = JSON.parse(JSON.stringify(userdata))
    handleUserSubmit(newuserdata)
    signOut(auth)
    resetLocaldata()
  }

  // Tapahtumien, tapahtumapaikkojen ja käyttäjien päivitykset firestoreen.
  // Poistot eivät ole vielä kenenkään käytössä sovelluksessa. Poiston saa tehtyä
  // toistaiseksi vain firebase admin.

  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'itemdata', id))
  }

  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'itemdata', newitem.id), newitem)
  }

  const handlePlaceDelete = async (id) => {
    await deleteDoc(doc(firestore, 'placedata', id))
  }

  const handlePlaceSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'placedata', newitem.id), newitem)
  }
  const handleUserDelete = async (id) => {
    await deleteDoc(doc(firestore, 'userdata', id))
  }

  const handleUserSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'userdata', newitem.id), newitem)
  }
  
  const handleInOutSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'inOutData', newitem.id), newitem)
  }

  const handleCommentSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'commentdata', newitem.id), newitem)
  }

  // handleIn ja handleOut tapahtuvat, kun tapahtumiin ilmoittaudutaan sisään
  // tai ulos. Molemmat tarkistavat kirjautuneen käyttäjän id:n perusteella, että
  // onko käyttäjä jo tapahtuman In- tai Out-datassa vai vielä ToDo-datassa. Päivittää
  // myös käyttäjän omiin tilastoihin aktiivisuusseurannan In- tai Out-määrää.

  const handleIn = (id) => {
    let newitemdata = JSON.parse(JSON.stringify(itemdata))
    let newinoutdata = JSON.parse(JSON.stringify(inOutData))
    let newuserdata = JSON.parse(JSON.stringify(userdata))
    let x = 0
    let userId = localdata.nameid

    if (newinoutdata[id].indata.includes(localdata.name)) {    
      x = 1

      } else if (newinoutdata[id].outdata.includes(localdata.name)) {
          x = 0
          if (x === 0) {
            let targetIndex = newinoutdata[id].outdata.indexOf(localdata.name)
            if (targetIndex !== -1) {
              newinoutdata[id].outdata.splice(targetIndex, 1)
              newinoutdata[id].indata.push(localdata.name)
              newitemdata[id].usersIn = newinoutdata[id].indata.length - 1
              newuserdata[userId].in = newuserdata[userId].in + 1
              handleItemSubmit(newitemdata[id]);
              handleInOutSubmit(newinoutdata[id]);  
              handleUserSubmit(newuserdata[userId]);
            }
          } 

          if (newitemdata[id].usersOut > -1) {
            newitemdata[id].usersOut = newinoutdata[id].outdata.length - 1
            newuserdata[userId].out = newuserdata[userId].out - 1
            handleItemSubmit(newitemdata[id]);
            handleUserSubmit(newuserdata[userId]);
          }

      } else {
        newinoutdata[id].indata.push(localdata.name)
        newitemdata[id].usersIn = newinoutdata[id].indata.length - 1
        newuserdata[userId].in = newuserdata[userId].in + 1
        let targetIndex = newinoutdata[id].tododata.indexOf(localdata.name)
          if (targetIndex !== -1) {
            newinoutdata[id].tododata.splice(targetIndex, 1)
          }
        handleItemSubmit(newitemdata[id]);
        handleUserSubmit(newuserdata[userId]);
        handleInOutSubmit(newinoutdata[id]);   
      } 
  }
       
  const handleOut = (id) => { 
    let newitemdata = JSON.parse(JSON.stringify(itemdata))
    let newinoutdata = JSON.parse(JSON.stringify(inOutData))
    let newuserdata = JSON.parse(JSON.stringify(userdata))
    let x = 0
    let userId = localdata.nameid
    
    if (newinoutdata[id].outdata.includes(localdata.name)) {   
      x = 1   

    } else if (newinoutdata[id].indata.includes(localdata.name)) {
        x = 0
        if (x === 0) {
          let targetIndex = newinoutdata[id].indata.indexOf(localdata.name)
          if (targetIndex !== -1) {
            newinoutdata[id].indata.splice(targetIndex, 1)
            newinoutdata[id].outdata.push(localdata.name)
            newitemdata[id].usersOut = newinoutdata[id].outdata.length - 1
            newuserdata[userId].out = newuserdata[userId].out + 1
            handleItemSubmit(newitemdata[id]);
            handleInOutSubmit(newinoutdata[id]);
            handleUserSubmit(newuserdata[userId]);            
          }
        }

        if (newitemdata[id].usersIn > -1) {
          newitemdata[id].usersIn = newinoutdata[id].indata.length - 1
          newuserdata[userId].in = newuserdata[userId].in - 1
          handleItemSubmit(newitemdata[id]);
          handleUserSubmit(newuserdata[userId]);
          }

      } else {
        newinoutdata[id].outdata.push(localdata.name)
        newitemdata[id].usersOut = newinoutdata[id].outdata.length - 1
        newuserdata[userId].out = newuserdata[userId].out + 1
        let targetIndex = newinoutdata[id].tododata.indexOf(localdata.name)
          if (targetIndex !== -1) {
            newinoutdata[id].tododata.splice(targetIndex, 1)
          }
        handleItemSubmit(newitemdata[id]);
        handleInOutSubmit(newinoutdata[id]);  
        handleUserSubmit(newuserdata[userId]); 
      }
  }

  // Testereitä, joilla admin voi tarkistella dataa virheiden sattuessa.
 
  const localtesti = () => {
    console.log(localdata)
  }

  const usertesti = () => {
    console.log(userdata)
  }

  const inouttesti = () => {
    console.log(inOutData)
  }

  const itemtesti = () => {
    console.log(itemdata)
  }

  const placetesti = () => {
    console.log(placedata)
  }

  const commenttesti = () => {
    console.log(commentdata)
  }

  if (localdata.signin == 1) {

  return (
    <>
      <AppRouter handleReset={handleReset}
                 onHandlePassword={handlePassword}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete}
                 onPlaceSubmit={handlePlaceSubmit}
                 onPlaceDelete={handlePlaceDelete}
                 onUserSubmit={handleUserSubmit}
                 onUserDelete={handleUserDelete}
                 onInOutSubmit={handleInOutSubmit}
                 onCommentSubmit={handleCommentSubmit}
                 onHandleIn={handleIn}
                 onHandleOut={handleOut}
                 localtesti={localtesti}
                 usertesti={usertesti}
                 inouttesti={inouttesti}
                 itemtesti={itemtesti}
                 placetesti={placetesti}
                 commenttesti={commenttesti}
                 localdata={localdata}
                 userdata={userdata}
                 itemdata={itemdata}
                 inOutData={inOutData}
                 placedata={placedata}
                 commentdata={commentdata} />
    </>
  ) 

  } else {

  return (
    <>
      <Login onHandleLocaldata={handleLocaldata}
             localdata={localdata}
             userdata={userdata} />
    </>
  )
  }
}

export default App
