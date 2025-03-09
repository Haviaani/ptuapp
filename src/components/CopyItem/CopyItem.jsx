import './CopyItem.css'
import ItemForm from '../ItemForm'
import { useLoaderData } from 'react-router-dom'

function CopyItem(props) {
  
  const data = useLoaderData()

  let copy = 1

  return (
  
          <div className="copyitem">

            <h3>Tapahtuman kopioiminen</h3>

            <ItemForm onItemSubmit={props.onItemSubmit} 
                      onItemDelete={props.onItemDelete}
                      onInOutSubmit={props.onInOutSubmit}aaaaaaaaaaaaaaa
                      onCommentSubmit={props.onCommentSubmit}
                      inOutData={props.inOutData}
                      placedata={props.placedata}
                      userdata={props.userdata}
                      itemdata={props.itemdata}
                      commentdata={props.commentdata}
                      formData={data.item}
                      copy={copy}/>
          </div>
        
      )
  
}
        

      
export default CopyItem
