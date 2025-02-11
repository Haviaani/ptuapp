import './Users.css'
import Admin from '../Admin'
import Coach from '../Coach'
import User from '../User/User'

function Users(props) {

  if (props.localdata.accesslevel == 1) {
 
    return (
      <>
        <div className="components"> 
          <User localdata={props.localdata}
                userdata={props.userdata}
                handlePassword={props.handlePassword} />
        </div>
      </>
    )
  }

  if (props.localdata.accesslevel == 2) {

    return (
      <>
        <div className="components"> 
          <User localdata={props.localdata}
                userdata={props.userdata}
                handlePassword={props.handlePassword} />
        </div>
        <div className="components"> 
          <Coach />
        </div>
      </>
    )
  }

  if (props.localdata.accesslevel === 3) {

    return (
      <>
        <div className="components"> 
          <User localdata={props.localdata}
                userdata={props.userdata}
                handlePassword={props.handlePassword} />
        </div>
        <div className="components"> 
          <Coach />
        </div>
        <div className="components"> 
          <Admin />
        </div>
      </>

    )
  }

}

export default Users
