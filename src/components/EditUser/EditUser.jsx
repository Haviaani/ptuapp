import './EditUser.css'
import UserForm from '../UserForm'
import { useLoaderData } from 'react-router-dom'

function EditUser(props) {
 
  const data = useLoaderData()

  return (
    <div className="edituser">
        <h3>Käyttäjän muokkaaminen</h3>
        <UserForm onUserSubmit={props.onUserSubmit}
                  onUserDelete={props.onUserDelete}
                  userdata={props.userdata} 
                  formData={data.user}/>
    </div>
  )
}

export default EditUser
