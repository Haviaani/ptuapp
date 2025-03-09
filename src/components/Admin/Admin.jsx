import './Admin.css'
import { useState } from 'react'

function Admin(props) {

  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const [resetMessage, setResetMessage] = useState("")
  
  let users = []

  for (let i = 0; i < props.userdata.length; i++) {
    users.push(props.userdata[i].name1)
  }

  const handleChange = () => {

    setSelectedUser(event.target.value)
    const indexUser = props.userdata.findIndex(key => key.name1 === event.target.value)

    if (indexUser !== -1) {
      setShowForm(true)
     } else {
      setShowForm(false)
     }

  }

  const handleConfim = () => {
    const indexUser = props.userdata.findIndex(key => key.name1 === selectedUser)
    let newuserdata = JSON.parse(JSON.stringify(props.userdata[indexUser]))
    newuserdata.password = newuserdata.login
    props.onUserSubmit(newuserdata)
    setShowForm(false)
    setSelectedUser("")
    setResetMessage(`Salasana on resetoitu käyttäjälle: ${selectedUser}`)
    setTimeout(() => setResetMessage(""), 5000)
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedUser("")
    setResetMessage("")
  }
  

  return (
    <>
      <div className="title">
        Adminportaali
      </div>

      <div className="adminpage">
        <div className="passwordreset_title">
          Salasanan resetointi:
        </div>    
        <div className="passwordreset">
          <form>
            <select id="userpw" name="userpw" className="select_coach" onChange={handleChange} value={selectedUser}>
            <option value="">(Valitse käyttäjä)</option>
            {users.map(name1 => <option key={name1}>{name1}</option>)}
            </select>
          </form>
          {showForm && (
            <div className="confirm">
              Haluatko varmasti resetoida käyttäjän salasanan? <br />
              <button type="button" className="button_yes" onClick={handleConfim}>Kyllä</button>
              <button type="button" className="button_no" onClick={handleCancel}>Peruuta</button>
            </div>
          )}
          {resetMessage && (<div className="resetmessage">
            {resetMessage}
          </div>)}
        </div>      

        <div className="tests_title">
          Datan tulostus konsoliin:
        </div>
        <div className="tests">
          <button className="button_admin" onClick={props.localtesti}>   Localdata   </button>
          <button className="button_admin" onClick={props.usertesti}>    Userdata   </button>
          <button className="button_admin" onClick={props.inouttesti}>   Inoutdata   </button>
          <button className="button_admin" onClick={props.itemtesti}>    Itemdata   </button>
          <button className="button_admin" onClick={props.placetesti}>   Placedata   </button>
          <button className="button_admin" onClick={props.commenttesti}>  Commentdata  </button>
        </div>
      </div>
    </>
  )
}

export default Admin
