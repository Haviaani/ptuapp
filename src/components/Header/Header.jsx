import './Header.css'
import ptu from '../../assets/images/ptu.png'

function Header() {

  return (
    <>
      <div className="header">
      <img src={ptu} alt="logo" /> PTU-P17 <img src={ptu} alt="logo" />
      </div>
    </>
  )
}

export default Header
