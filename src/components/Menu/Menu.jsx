import './Menu.css'
import { NavLink } from 'react-router-dom'
import main from '../../assets/images/main.svg'
import user from '../../assets/images/user.svg'
import logout from '../../assets/images/logout.svg'

function Menu(props) {

  // users-sivulle oma rajoituksensa, että pitää olla vähintään accesslevel 1, 
  // että pääsee käyttäjä tietoihin. Tämä on tulevaa vanhempien tunnusta varten, 
  // että yleisillä vanhempien tunnuksella pääsee vain katsomaan tapahtumia.

  return (
    <>
      <div className="menu">

        <div className="buttons">
          <NavLink to="/"><img src={main} /></NavLink>
        </div>

        <div className="buttons">
          <NavLink to="users" style={{pointerEvents: props.localdata.accesslevel > 0 ? 'auto' : 'none'}}><img src={user} /></NavLink>
        </div>

        <div className="buttons">
          <img src={logout} onClick={props.handleReset}/>
        </div>
      
      </div>
    </>
  )
}

export default Menu
