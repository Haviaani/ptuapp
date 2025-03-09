import './Comments.css'
import { useNavigate } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'


function Comments(props) {
  
    const navigate = useNavigate()

    // Kerää kommentit omasta tapahtumastaan.
  
    const loaderdata = useLoaderData()
    let id = loaderdata.item.id  
    
    let commentdata = props.commentdata[id].comments
  
    const date = new Date(props.itemdata[id].date).toLocaleDateString("fi-FI")
  
    const goBack = () => {
      navigate (-1)
    }
  
  
      return (
      
        <div className="comments" >
            
          <div className="comments_rowtop">
            <div >{props.itemdata[id].event}</div>
            <div >{props.itemdata[id].place}</div>
          </div>
  
          <div className="comments_row">
            <div >{date}</div>
            <div >{props.itemdata[id].city}</div>
          </div>
      
          <div className="comments_row">
            <div >{props.itemdata[id].timestart} - {props.itemdata[id].timeend}</div>
            <div >{props.itemdata[id].address}</div>
          </div>

          <div className="box"> 
          <div className="comments_box">
            {commentdata.map((comment, index) => (
            <div className="comment" key={index}> {comment}</div> ))}
          </div> 
          </div>
              
          <div>   
            <div ><button className="comments_button" onClick={goBack}>Takaisin etusivulle</button></div>
          </div>
          </div>

      )
  }
  
  export default Comments
  