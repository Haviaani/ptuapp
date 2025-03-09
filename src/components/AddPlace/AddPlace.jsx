import './AddPlace.css'
import PlaceForm from '../PlaceForm'

function AddPlace(props) {
 
  return (
    <div className="addplace">
        <h3>Uuden tapahtumapaikan lisääminen</h3>
        <PlaceForm onPlaceSubmit={props.onPlaceSubmit}
                   placedata={props.placedata} />
    </div>

)
}

export default AddPlace
