import './Content.css'
import User from '../User'

function Content(props) {

  return (
    <>
      <div>
        Tervetuloa {props.localdata.loginname1} {props.localdata.loginname2}<br />
        Kirjauduit sisään!
        <br />
        <br />
        <button onClick={props.handleReset}>Kirjaudu ulos!</button>
      </div>

      <div>
        <button onClick={props.testit}>Testipainike</button>
      </div>

      <User localdata={props.localdata}
            userdata={props.userdata}
            handlePassword={props.handlePassword} />



    </>
  )
}

export default Content
