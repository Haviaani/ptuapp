import './EditItem.css'
import ItemForm from '../ItemForm'
import { useLoaderData } from 'react-router-dom'

function EditItem(props) {
  
  const data = useLoaderData()

  return (
  
          <div className="edititem">

            <h3>Tapahtuman muokkaaminen</h3>

            <ItemForm onItemSubmit={props.onItemSubmit} 
                      onItemDelete={props.onItemDelete}
                      onInOutSubmit={props.onInOutSubmit}
                      onCommentSubmit={props.onCommentSubmit}
                      inOutData={props.inOutData}
                      placedata={props.placedata}
                      userdata={props.userdata}
                      commentdata={props.commentdata}
                      formData={data.item}/>
          </div>
        
      )
  
}
        

      
export default EditItem
