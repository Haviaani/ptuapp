import './AddPlace.css'
import PlaceForm from '../PlaceForm'

function AddPlace(props) {
 
  return (
    <div className="additem">
        <h2>Uuden tapahtumapaikan lisääminen</h2>
        <PlaceForm onPlaceSubmit={props.onPlaceSubmit}
                   placedata={props.placedata} />
    </div>

)
}

export default AddPlace
