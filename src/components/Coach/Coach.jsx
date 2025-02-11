import './Coach.css'
import { Link } from 'react-router-dom'

function Coach(props) {
 
  return (
    <>
      <div className="title">
        Valmentajaportaali
      </div>

      <div>
      <Link to="/addplace"><button className="button1">Lisää tapahtumapaikka</button></Link>
      </div>

      <div>
        <button className="button1">Muokkaa tapahtumapaikkaa</button>
      </div>

      <div>
        <button className="button1">Lisää tapahtuma</button>
      </div>

      <div>
        <select className="button1">Muokkaa tapahtumaa</select>
      </div>

    </>
  )
}

export default Coach
