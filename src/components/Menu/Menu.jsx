import './Menu.css'
import { NavLink } from 'react-router-dom'

function Menu(props) {

  return (
    <>
      <div className="menu">
      <NavLink to="">Etusivu</NavLink> - <NavLink to="users">Käyttäjä</NavLink>
      </div>
    </>
  )
}

export default Menu
