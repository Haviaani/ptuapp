import './Users.css'
import Admin from '../Admin'
import Coach from '../Coach'
import User from '../User/User'

function Users(props) {

  if (props.localdata.accesslevel === 1) {
 
    return (
      <>
        <div className="components"> 
          <User localdata={props.localdata}
                userdata={props.userdata}
                inOutData={props.inOutData}
                onHandlePassword={props.onHandlePassword} />
        </div>
      </>
    )
  }

  if (props.localdata.accesslevel === 2) {

    return (
      <>
        <div className="components"> 
          <User localdata={props.localdata}
                userdata={props.userdata}
                inOutData={props.inOutData}
                onHandlePassword={props.onHandlePassword} />
        </div>
        <div className="components"> 
          <Coach localdata={props.localdata}
                 itemdata={props.itemdata}
                 userdata={props.userdata}
                 placedata={props.placedata}/>
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
                inOutData={props.inOutData}
                onHandlePassword={props.onHandlePassword} />
        </div>
        <div className="components"> 
          <Coach localdata={props.localdata}
                 userdata={props.userdata}
                 itemdata={props.itemdata}
                 placedata={props.placedata}/>
        </div>
        <div className="components"> 
          <Admin localdata={props.localdata}
                 userdata={props.userdata}
                 inOutData={props.inOutData}
                 placedata={props.placedata}
                 commentdata={props.commentdata}
                 localtesti={props.localtesti}
                 usertesti={props.usertesti}
                 inouttesti={props.inouttesti}
                 itemtesti={props.itemtesti}
                 placetesti={props.placetesti}
                 commenttesti={props.commenttesti}
                 onUserSubmit={props.onUserSubmit} />
        </div>
      </>

    )
  }

}

export default Users
