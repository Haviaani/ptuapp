import './Root.css'
import Header from '../Header'
import Content from '../Content'
import Menu from '../Menu'
import { Outlet } from 'react-router-dom'

function Root(props) {

  return (
    <>
      <div className="root">
        <div className="root_container">
          <div className="container">
            <Header />
            <Content handleReset={props.handleReset}
                     handlePassword={props.handlePassword}
                     handleUserReset={props.handleUserReset}
                     onHandleSet={props.handleSet}
                     localdata={props.localdata}
                     userdata={props.userdata}
                     itemdata={props.itemdata}
                     commentdata={props.commentdata}
                     testit={props.testit}
                     localtesti={props.localtesti}
                     usertesti={props.usertesti}
                     inouttesti={props.inouttesti}
                     itemtesti={props.itemtesti}
                     placetesti={props.placetesti}
                     inOutData={props.inOutData}>
             <Outlet />
            </Content>
            <Menu localdata={props.localdata} 
                  userdata={props.userdata}
                  handleReset={props.handleReset}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Root
