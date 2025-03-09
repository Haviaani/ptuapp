import './AddItem.css'
import ItemForm from '../ItemForm'

function AddItem(props) {
 
  return (
    <div className="additem">
        <h3>Uuden tapahtuman lisääminen</h3>
        <ItemForm onItemSubmit={props.onItemSubmit}
                  onInOutSubmit={props.onInOutSubmit}
                  onCommentSubmit={props.onCommentSubmit}
                  inOutData={props.inOutData}
                  itemdata={props.itemdata}
                  userdata={props.userdata}
                  placedata={props.placedata} 
                  commentdata={props.commentdata}/>
    </div>

)
}

export default AddItem
