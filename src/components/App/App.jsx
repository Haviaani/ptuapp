import AppRouter from '../AppRouter'
import React from 'react'
import './App.css'
import logo from '../../assets/images/ptu.png'

import useLocalStorage from '../../utils/useLocalStorage.js'
import users from '../../data/users.js'
import testdata from '../../data/items.js'
import inout from '../../data/inout.js'
import places from '../../data/places.js'

import firebase from './firebase.js'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'





function App() {

  const initialdata = {
    signin: 0,
    nameok: -1,
    nameid: -1,
    passwordok: -2,
    passwordid: -2,
    loginid: -1,
    loginname: "",
    name: "",
    status: "",
    newpw1: "",
    newpw2: "",
    accesslevel: 1,
  }
  
  const [localdata, setLocaldata, resetLocaldata] = useLocalStorage('localdata', initialdata);

  const [userdata, setUserdata, resetUserdata] = useLocalStorage('userdata', users);

  const [itemdata, setItemdata, resetItemdata] = useLocalStorage('itemdata', testdata);

  const [inOutData, setInOutData, resetInOutData] = useLocalStorage('inoutdata', inout);

  const [placedata, setPlacedata, resetPlacesdata] = useLocalStorage('placesdata', places);

  // const [data, setData] = useState(testdata);

  // const [userdata2, setUserdata2] = useState([])

  // const firestore = getFirestore(firebase)

  useEffect(() => {}, [localdata, userdata, itemdata, inOutData, placedata]);


  let newlocaldata = {...localdata}

  const handleSubmitSignIn = (event) => {
    if (event) {
        event.preventDefault()
    }

    if (localdata.nameok == 1) {

      if (localdata.passwordok == 1) {
    
        if (localdata.nameid+1 == localdata.passwordid+1) {
        newlocaldata.signin = 1

        setLocaldata(newlocaldata);

        let x = localdata.nameid
          
        newlocaldata.loginid = userdata[x].id
        newlocaldata.loginname = userdata[x].name1
        newlocaldata.accesslevel = userdata[x].accesslevel
        newlocaldata.name = userdata[x].name2

        setLocaldata(newlocaldata);
        
        } else {
          alert('VÄÄRÄ TUNNUS/SALASANA')
        }

      } else {
        alert('VÄÄRÄ SALASANA')
      }

    } else {
      alert('VÄÄRÄ TUNNUS')
    }
    
}

  const handleChangeSignInName = (event) => {
    for (let i = 0; i < userdata.length; i++) {
      if (event.target.value == userdata[i].login) {
        newlocaldata.nameid = [i]
        newlocaldata.nameok = 1
      }
    }
    setLocaldata(newlocaldata);
  }

  const handleChangeSignInPW = (event) => {
    for (let i = 0; i < userdata.length; i++) {
      if (event.target.value == userdata[i].password) {
        newlocaldata.passwordid = [i]
        newlocaldata.passwordok = 1
      }
    }
    setLocaldata(newlocaldata);
  }


  const handlePassword = (newlocaldata) => {
    let x = localdata.nameid
    let newuserdata = JSON.parse(JSON.stringify(userdata))
    newuserdata[x].password = newlocaldata.newpw1
    let newdata = JSON.parse(JSON.stringify(newuserdata))
        
    setUserdata(newdata)
  }

  const handleReset = () => {
    let newuserdata = JSON.parse(JSON.stringify(userdata))
    setUserdata(newuserdata)
    resetLocaldata();
  }

  const handleUserReset = () => {
    resetUserdata();
  }

  const handleItemDelete = (id) => {
    let copy = itemdata.slice()
    copy = copy.filter(item => item.id !== id)
    setItemdata(copy)
  }

  const handleItemSubmit = (newitem) => {
    let copy = itemdata.slice()
    
    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      copy[index] = newitem
    } else {
      copy.push(newitem)
    }

    setItemdata(copy)
  }

  const handlePlaceDelete = (id) => {
    let copy = placedata.slice()
    copy = copy.filter(item => item.id !== id)
    setPlacedata(copy)
  }

  const handlePlaceSubmit = (newplace) => {
    let copy = placedata.slice()
    
    const index = copy.findIndex(item => item.id === newplace.id)
    if (index >= 0) {
      copy[index] = newplace
    } else {
      copy.push(newplace)
    }

    setPlacedata(copy)
  }
  
  const handleInOutSubmit = (copy) => {
       setInOutData(copy)
  }

  // Alemman voi poistaa lopuksi
  const handleTypeSubmit = (type) => {
    let copy = typelist.slice()
    copy.push(type)
    copy.sort()
    setTypelist(copy)
  }

  const handleIn = (id) => {
    let newitemdata = JSON.parse(JSON.stringify(itemdata))
    let newinoutdata = JSON.parse(JSON.stringify(inOutData))
    let x = 0

    if (newinoutdata[id].indata.includes(localdata.name)) {    
      console.log("Löytyy jo tästä." + x)    
      x = 1

      } else if (newinoutdata[id].outdata.includes(localdata.name)) {
          console.log("Ei löytynyt tästä, mutta löytyy toisesta. Pitää poistaa" + x)
          x = 0
          if (newitemdata[id].usersOut > -1) {
            newitemdata[id].usersOut = newitemdata[id].usersOut - 1
            setItemdata(newitemdata);
          }

          if (x === 0) {
            let targetIndex = newinoutdata[id].outdata.indexOf(localdata.name)
            if (targetIndex !== -1) {
              newinoutdata[id].outdata.splice(targetIndex, 1)
              console.log("Lisätään myös tähän.")
              newitemdata[id].usersIn = newitemdata[id].usersIn + 1
              newinoutdata[id].indata.push(localdata.name)
        }
      }

      setItemdata(newitemdata);
      setInOutData(newinoutdata);   

      } else {
        console.log("Lisätään tähän.")
        newitemdata[id].usersIn = newitemdata[id].usersIn + 1
        newinoutdata[id].indata.push(localdata.name)
        let targetIndex = newinoutdata[id].tododata.indexOf(localdata.name)
          if (targetIndex !== -1) {
            newinoutdata[id].tododata.splice(targetIndex, 1)
          }
        setItemdata(newitemdata);
        setInOutData(newinoutdata);     
      } 
      setItemdata(newitemdata);
      setInOutData(newinoutdata);  
  }
  
       
  const handleOut = (id) => { 
    let newitemdata = JSON.parse(JSON.stringify(itemdata))
    let newinoutdata = JSON.parse(JSON.stringify(inOutData))
    let x = 0
    
    if (newinoutdata[id].outdata.includes(localdata.name)) {   
      console.log("Löytyy jo tästä.")
      x = 1   

    } else if (newinoutdata[id].indata.includes(localdata.name)) {
        console.log("Ei löytynyt tästä, mutta löytyy toisesta. Pitää poistaa")
        x = 0
        if (newitemdata[id].usersIn > -1) {
        newitemdata[id].usersIn = newitemdata[id].usersIn - 1
        setItemdata(newitemdata);
        }

        if (x === 0) {
          let targetIndex = newinoutdata[id].indata.indexOf(localdata.name)
          if (targetIndex !== -1) {
            newinoutdata[id].indata.splice(targetIndex, 1)
            console.log("Lisätään myös tähän.")  
            newitemdata[id].usersOut = newitemdata[id].usersOut + 1 
            newinoutdata[id].outdata.push(localdata.name)
          }
        }
        setItemdata(newitemdata);
        setInOutData(newinoutdata);

      } else {
        console.log("Lisätään tähän.")  
        newitemdata[id].usersOut = newitemdata[id].usersOut + 1 
        newinoutdata[id].outdata.push(localdata.name)
        let targetIndex = newinoutdata[id].tododata.indexOf(localdata.name)
          if (targetIndex !== -1) {
            newinoutdata[id].tododata.splice(targetIndex, 1)
          }
        setItemdata(newitemdata);
        setInOutData(newinoutdata);   
      }
      setItemdata(newitemdata);
      setInOutData(newinoutdata);
  }
  
  

  const testit = () => {
    console.log("In: " + itemdata[0].usersIn + " Out " + itemdata[0].usersOut + " In: " + inOutData[0].indata + " Out: " + inOutData[0].outdata)
    console.log("In: " + itemdata[1].usersIn + " Out " + itemdata[1].usersOut + " In: " + inOutData[1].indata + " Out: " + inOutData[1].outdata)
    console.log(userdata[2].password)
    console.log('-----')
  }

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

  if (localdata.signin == 1) {

  return (
    <>
      <AppRouter handleReset={handleReset}
                 handleUserReset={handleUserReset}
                 handlePassword={handlePassword}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete}
                 onPlaceSubmit={handlePlaceSubmit}
                 onPlaceDelete={handlePlaceDelete}
                 onTypeSubmit={handleTypeSubmit}
                 onInOutSubmit={handleInOutSubmit}
                 onHandleIn={handleIn}
                 onHandleOut={handleOut}
                 testit={testit}
                 localtesti={localtesti}
                 usertesti={usertesti}
                 inouttesti={inouttesti}
                 itemtesti={itemtesti}
                 placetesti={placetesti}
                 localdata={localdata}
                 userdata={userdata}
                 itemdata={itemdata}
                 inOutData={inOutData}
                 placedata={placedata} />
    </>
  ) 

  } else {

  return (
    <>
    <div className="login">
      <div className="login_title">
        <h1>PTU-P17</h1><br />
        IlmoÄppi
      </div>

      <div className="login_img">
        <img src={logo} alt="logo" />
      </div>
           
      <div className="login_form">
        <form onSubmit={handleSubmitSignIn}>
         <label>Anna käyttäjätunnus</label><br />
          <input type='text' id='tunnus' onChange={handleChangeSignInName}></input><br />
          <br />
          <label>Anna sanasana</label><br />
          <input type='password' id='salasana' onChange={handleChangeSignInPW}></input><br />
          <br /><br /><br />
          <button className="login_button" type='submit'>Kirjaudu sisään</button>
        </form>
      </div>
    </div>
    </>
  )
  }
}

export default App
