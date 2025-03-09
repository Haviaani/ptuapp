import './EditPlace.css'
import PlaceForm from '../PlaceForm'
import { useLoaderData } from 'react-router-dom'

function PlaceUser(props) {
 
  const data = useLoaderData()

  return (
    <div className="edituser">
        <h3>Tapahtumapaikan muokkaaminen</h3>
        <PlaceForm onPlaceSubmit={props.onPlaceSubmit}
                  onPlaceDelete={props.onPlacerDelete}
                  placedata={props.placedata} 
                  formData={data.place}/>
    </div>
  )
}

export default PlaceUser
