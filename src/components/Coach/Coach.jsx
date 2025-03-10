import './Coach.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Coach(props) {

  const navigate = useNavigate()

  // Alla olevat tekevät listan Select-inputeille tapahtumista, tapahtumapaikoista ja käyttäjistä.aaaa

  let events = []

  for (let i = 0; i < props.itemdata.length; i++) {
    events.push(props.itemdata[i].event + " " + props.itemdata[i].date)
  }

  let places = []

  for (let i = 0; i < props.placedata.length; i++) {
      places.push(props.placedata[i].place)
  }

  let users = []

  for (let i = 0; i < props.userdata.length; i++) {
    users.push(props.userdata[i].name1)
  }

  // Tarkistaa mitä tapahtumaa suoritetaan ja navigoi indexin/id:n perusteella
  // muokkaamaan kyseistä tapahtumapaikkaa tai käyttäjää. Tapahtumien kohdalla 
  // tapahtuman pääsee kopioimaan esitäytetyin tiedoin. Tapahtumien muokkaus löytyy
  // tapahtumalistauksesta omasta kuvakkeestaan.

  const handleChange = () => {

    const indexPlace = props.placedata.findIndex(key => key.place === event.target.value)
    const indexUser = props.userdata.findIndex(key => key.name1 === event.target.value)
    const indexItem = props.itemdata.findIndex(key => key.event + " " + key.date === event.target.value)

    if (indexPlace !== -1) {
      navigate("/editplace/" + indexPlace)
    }
    if (indexUser !== -1) {
      navigate("/edituser/" + indexUser)
    }  
    if (indexItem !== -1) {
      navigate("/copyitem/" + indexItem)
    }  
  }
  
   
  return (
    <>
      <div className="">
        <div className="title">
          Valmentajaportaali
        </div>

        <div className="coachpage">
          <div className="coach_titles">
            Tapahtumat:
            <div className="coach_row">                   
              <div className="coach_row_left">
                <NavLink to="/additem"><button className="button_coach">Lisää tapahtuma</button></NavLink>
              </div>
              <div className="coach_row_rigth">
                <form>
                  <select id="event" name="event" className="select_coach" onChange={handleChange}>
                  <option value="">(Kopioi tapahtuma)</option>
                  {events.map(date => <option key={date}>{date}</option>)}
                  </select>
                </form>
              </div>
            </div>
          </div>
          
          <div className="coach_titles">
            Tapahtumapaikat:
            <div className="coach_row">  
              <div className="coach_row_left">
                <NavLink to="/addplace"><button className="button_coach">Lisää tapahtumapaikka</button></NavLink>
              </div>
              <div className="coach_row_rigth">
                <form>
                  <select id="place" name="place" className="select_coach" onChange={handleChange}>
                  <option value="">(Muokkaa tapahtumapaikkaa)</option>
                  {places.map(place => <option key={place}>{place}</option>)}
                  </select>
                </form>
              </div>
            </div>
          </div>

          <div className="coach_titles">
            Käyttäjät:
            <div className="coach_row">    
              <div className="coach_row_left">
                <NavLink to="/adduser"><button className="button_coach">Lisää käyttäjä</button></NavLink>
              </div>
              <div className="coach_row_rigth">
                <form>
                  <select id="user" name="user" className="select_coach" onChange={handleChange}>
                  <option value="">(Muokkaa käyttäjää)</option>
                  {users.map(name1 => <option key={name1}>{name1}</option>)}
                  </select>
                </form>
              </div>
            </div>         
          </div>

          <div className="coach_titles">
            Käyttäjätilastot:
            <br />
            (Tulossa)
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Coach
