import './AddUser.css'
import UserForm from '../UserForm'

function AddUser(props) {
 
  return (
    <div className="adduser">
        <h3>Uuden käyttäjän lisääminen</h3>
        <UserForm onUserSubmit={props.onUserSubmit}
                  onUserDelete={props.onUserDelete}
                  userdata={props.userdata} />
    </div>

)
}

export default AddUser
