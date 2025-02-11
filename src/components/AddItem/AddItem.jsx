import './AddItem.css'
import ItemForm from '../ItemForm'

function AddItem(props) {
 
  return (
    <div className="additem">
        <h2>Uuden tapahtuman lisääminen</h2>
        <ItemForm onItemSubmit={props.onItemSubmit}
                  onInOutSubmit={props.onInOutSubmit}
                  inOutData={props.inOutData}
                  itemdata={props.itemdata}
                  userdata={props.userdata}
                  placedata={props.placedata} />
    </div>

)
}

export default AddItem
