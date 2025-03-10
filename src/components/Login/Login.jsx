import './Login.css'
import logo from '../../assets/images/ptu.png'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebase from '../../utils/firebase.js'

function Login (props) {

  const [loginMessage, setLoginMessage] = useState("")
  const firestore = getFirestore(firebase)
  
  let newlocaldata = {...props.localdata}

  let loginform = document.getElementById('loginform')

  const loginSubmit = () => {
    login(loginform.login.value, loginform.password.value)
  }

  // Yleinen auth-tunnus kaikille sisäänkirjautuneille.

  const firebaseAuth = () => {
    const auth = getAuth()
    const email = "heiwis82@gmail.com"
    const password = "PTU1931"
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;        
      })
      .catch((error) => {
      })
  }

  // Käyttäjän ja salasanan tarkistus

  const login = async (username, password) => {

    event.preventDefault()

    try {

      const q = query(collection(firestore, 'userdata'), where('login', '==', username))
      const querySnapshot = await getDocs(q)

      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()

      // Vertaa salasanaa cryptattuna

      const passwordMatch = await bcrypt.compare(password, userData.password)
  
      if (passwordMatch) {
       
        firebaseAuth()  

        for (let i = 0; i < props.userdata.length; i++) {
            if (loginform.login.value == props.userdata[i].login) {
                newlocaldata.nameid = i
                newlocaldata.loginid = props.userdata[i].id
                newlocaldata.loginname = props.userdata[i].name1
                newlocaldata.accesslevel = props.userdata[i].accesslevel
                newlocaldata.name = props.userdata[i].name2
                newlocaldata.signin = 1   
                props.onHandleLocaldata(newlocaldata)
            }
        }

      } else {
        setLoginMessage('Väärä salasana')
        newlocaldata.signin = 0

      }
    } catch (error) {
      setLoginMessage('Käyttäjää ei löytynyt')
      newlocaldata.signin = 0      
    }
    setTimeout(() => setLoginMessage(""), 5000)
    props.onHandleLocaldata(newlocaldata)
  }

return (
    <>
    <div className="login">
      <div className="login_title">
        <div className="login_titletext">
            PTU-P17
        </div><br />
        IlmoÄppi
      </div>

      <div className="login_img">
        <img src={logo} alt="logo" />
      </div>
           
      <div className="login_form">
        <form id="loginform" onSubmit={loginSubmit}>
         <label>Anna käyttäjätunnus</label><br />
          <input type='text' id="login"></input><br />
          <br />
          <label>Anna sanasana</label><br />
          <input type='password' id="password"></input><br />
          {loginMessage && (
              <div className="loginmessage">
                {loginMessage}
              </div>
            )}
          <br /><br /><br />
          <button className="login_button" type='submit'>Kirjaudu sisään</button>
        </form>
      </div>
    </div>
    </>
  )
}

  export default Login