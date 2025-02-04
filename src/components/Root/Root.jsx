import './Root.css'
import Header from '../Header'
import Content from '../Content'
import Menu from '../Menu'
import { Outlet } from 'react-router-dom'

function Root(props) {

  return (
    <>
      <div>
        <Header />
          <Content handleReset={props.handleReset}
                   handlePassword={props.handlePassword}
                   handleUserReset={props.handleUserReset}
                   localdata={props.localdata}
                   userdata={props.userdata}
                   testit={props.testit}>
            <Outlet />
          </Content>
        <Menu />
      </div>
    </>
  )
}

export default Root
