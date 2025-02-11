import './Content.css'
import { Link } from 'react-router-dom'

function Content(props) {

  return (
    <>
      <div className="content">
        {props.children}
      

      <div className="buttonbar">
        <button className="buttonbar_button"><Link to="/add">Lisää tapahtuma</Link></button>
        <button className="buttonbar_button" onClick={props.testit}>       Testipainike   </button>
        <button className="buttonbar_button" onClick={props.localtesti}>   Localdata   </button>
        <button className="buttonbar_button" onClick={props.usertesti}>    Userdata   </button>
        <button className="buttonbar_button" onClick={props.inouttesti}>   Inoutdata   </button>
        <button className="buttonbar_button" onClick={props.itemtesti}>    Itemdata   </button>
        <button className="buttonbar_button" onClick={props.placetesti}>  Placesdata   </button>
        <button className="buttonbar_button" onClick={props.handleReset}>  Kirjaudu ulos  </button>
      </div>
    </div>
    </>
  )
}

export default Content
