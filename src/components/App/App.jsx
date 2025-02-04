import AppRouter from '../AppRouter'
import './App.css'
import useLocalStorage from '../../utils/useLocalStorage.js'
import { useState } from 'react'
import users from '../../data/users.js'



function App() {

  const initialdata = {
    signin: 0,
    nameok: -1,
    nameid: -1,
    passwordok: -2,
    passwordid: -2,
    loginid: -1,
    loginname1: "",
    loginname2: "",
    status: "",
    newpw1: "",
    newpw2: "",
  }
  
  const [localdata, setLocaldata, resetLocaldata] = useLocalStorage('localdata', initialdata);

  const [userdata, setUserdata, resetUserdata] = useLocalStorage('userdata', users);


  let newlocaldata = {...localdata}

  let y = localdata.nameid

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
        newlocaldata.loginname1 = userdata[x].name1
        newlocaldata.loginname2 = userdata[x].name2

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
    for (let i = 0; i<userdata.length; i++) {
      if (event.target.value == userdata[i].login) {
        newlocaldata.nameid = [i]
        newlocaldata.nameok = 1
      }
    }
    setLocaldata(newlocaldata);
  }

  const handleChangeSignInPW = (event) => {
    for (let i = 0; i<userdata.length; i++) {
      if (event.target.value == userdata[i].password) {
        newlocaldata.passwordid = [i]
        newlocaldata.passwordok = 1
      }
    }
    setLocaldata(newlocaldata);
  }


  const handlePassword = () => {
    let x = localdata.nameid
    let newuserdata = JSON.parse(JSON.stringify(userdata))
    userdata[x].password = localdata.newpw1
    let newdata = JSON.parse(JSON.stringify(newuserdata))
        
    setLocaldata(newlocaldata)
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

  const testit = () => {
    console.log(localdata.loginid + " loginid")
    console.log(localdata.nameid + " nameid")
    console.log(localdata.passwordid + " passwordid")
    console.log(localdata.signin + " sigin")
    console.log(localdata.nameok + " nameok")
    console.log(localdata.passwordok + " passwordok")
    console.log(localdata.loginname1 + " loginname1")
    console.log(localdata.loginname2 + " loginname2")
    console.log(localdata.newpw1)
    console.log(localdata.newpw2)
    console.log(userdata[2].password)
    console.log('-----')
  }

  if (localdata.signin == 1) {

  return (
    <>
      <AppRouter handleReset={handleReset}
                 handleUserReset={handleUserReset}
                 handlePassword={handlePassword}
                 testit={testit}
                 localdata={localdata}
                 userdata={userdata}/>
    </>
  ) 

  } else {

  return (
    <>
    <div>
    <h1>Tervetuloa!</h1>
    <h2>Kirjaudu sisään</h2>
    <form onSubmit={handleSubmitSignIn}>
      <label>Anna käyttäjätunnus</label>
      <input type='text' id='tunnus' onChange={handleChangeSignInName}></input>
      <br />
      <label>Anna sanasana</label>
      <input type='text' id='salasana' onChange={handleChangeSignInPW}></input>
      <br />
      <button type='submit'>Kirjaudu</button>
    </form>

      <button onClick={testit}>Testit</button>
    </div>
    </>
  )



  }


}

export default App
