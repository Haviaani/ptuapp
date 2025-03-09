import './User.css'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import eye from '../../assets/images/eye.svg'
import eyeoff from '../../assets/images/eyeoff.svg'

function User(props) {

  const [showForm, setShowForm] = useState(false)
  const [changeMessage, setChangeMessage] = useState("")
  const [inputType, setInputType] = useState ("password")
  const [picture, setPicture] = useState(eyeoff)

  // hadnleMouse toiminnot muuttavat salasanojen *** tiedot näkyviksi painettaessa.
  // Myös kuvake muuttuu.

  const handleMouseDown = () => {    
    setPicture(eye)
    setInputType("text")
  }
    
  const handleMouseUp = () => {
    setPicture(eyeoff)
    setInputType("password")
  } 

  // Tarkistaa, että syötetyt salasanat vastaavat ja että vanha salasana vastaa
  // käyttäjän datassa olevaa.

  const checkPassword = async (event) => {

    event.preventDefault()
  
    let form = document.getElementById('password')
        
    let newlocaldata = {...props.localdata}

    const passwordMatch = await bcrypt.compare(form.passwordold.value, props.userdata[props.localdata.nameid].password)

    if (form.password.value === form.passwordconfirm.value) {
      if (form.password.value != "") {
        if (form.password.value.length < 5) { 
          setChangeMessage("Salasana liian lyhyt. Vähimmäispituus 5")

        } else if (passwordMatch) {
          newlocaldata.newpw1 = form.password.value 
          newlocaldata.newpw2 = form.passwordconfirm.value
          props.onHandlePassword(newlocaldata)
          setChangeMessage("Salasana vaihdettu!")
          setTimeout(() => setShowForm(false), 5000)

         } else {
          setChangeMessage("Vanha salasana ei täsmää")
         }

      } else {
        setChangeMessage("Salasana ei voi olla tyhjä")
      }

    } else if (form.password.value !== form.passwordconfirm.value) {
      setChangeMessage("Salasanat eivät täsmää")
    }
      
     setTimeout(() => setChangeMessage(""), 5000)
  }

  if (showForm) {
    return (
      <>       
        <div className="title">
           {props.localdata.loginname} 
        </div>

        <div className="userpage">
          <div className="user_info">
            <div className="inout">
              Aktiivisuustilasto: 
            </div>
            <div className="inout">
              <div>
                In: {props.userdata[props.localdata.nameid].in}
              </div>
              <div>
                Out: {props.userdata[props.localdata.nameid].out}
              </div>
            </div>
          </div>    

          <div className="passwordform">
            <form onSubmit={checkPassword} id="password">
              Anna uusi salasana:<br /> <input type={inputType} name="password"></input> <br />
              Anna salasana uudestaan:<br /> <input type={inputType} name="passwordconfirm"></input> <br />
              Anna vanha salasana:<br /> <input type={inputType} name="passwordold"></input> <br />
              <span style={{ cursor: "pointer"}}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}>
                    <img src={picture} />
              </span><br />
              <button type="submit" className="button_user">Aseta uusi salasana</button> <br />
              <button type="button" className="button_user" onClick={()=>{setShowForm(false)}}>Peruuta</button> <br />
            </form>
            {changeMessage && (
              <div className="changemessage">
                {changeMessage}
              </div>
            )}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="title">
           {props.localdata.loginname} 
        </div>

        <div className="userpage">
          <div className="user_info">
            <div className="inout">
              Aktiivisuustilasto: 
            </div>
            <div className="inout">
              <div>
                In: {props.userdata[props.localdata.nameid].in}
              </div>
              <div>
                Out: {props.userdata[props.localdata.nameid].out}
              </div>
            </div>
          </div>        

          <div className="setpassword_off">
          <button type="button" className="button_user" onClick={()=>{setShowForm(true)}}>Vaihda salasana</button>
        </div>
        </div>
      </>
    )
  }
    
}

export default User
