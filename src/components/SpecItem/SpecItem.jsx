import { useState } from 'react'
import './SpecItem.css'
import { useLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import IOData from '../IOData'

function SpecItem(props) {

  // SpecItem sivu on tapahtumien tarkempien tietojen selaamiseen ja kommenttien lisäämiseen.

  const [comment, setComment] = useState("")

  const navigate = useNavigate()

  const loaderdata = useLoaderData()
  let id = loaderdata.item.id  
  let inOutData = props.inOutData

  const date = new Date(props.itemdata[id].date).toLocaleDateString("fi-FI")
  const regdate = new Date(props.itemdata[id].regendd).toLocaleDateString("fi-FI")

  const handleIn = () => {
    props.onHandleIn(id)
  }

  const handleOut = () => {
    props.onHandleOut(id)
  }

  const goBack = () => {
    navigate (-1)
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleComment = (event) => {
    event.preventDefault()

    if (!props.commentdata[id]) {
      props.commentdata[id] = {
        id: id,
        comments: []
      }
    }

    let newcommentdata = {...props.commentdata}

    newcommentdata[id].comments.push(props.localdata.name + ": " + comment)
    props.onCommentSubmit(newcommentdata[id])
    setComment("")
  }

  let inColor = false
  let outColor = false

  if (props.inOutData[id].indata.includes(props.localdata.name)) {
    inColor = true
  }

  if (props.inOutData[id].outdata.includes(props.localdata.name)) {
    outColor = true
  }

  const buttonIn = inColor ? 'spec_button1_true' : 'spec_button1_false'

  const buttonOut = outColor ? 'spec_button2_true' : 'spec_button2_false'

  const currentDate = new Date()
  const dateTime = `${props.itemdata[id].regendd}T${props.itemdata[id].regendt}:00`;
  const regEndDate = new Date(dateTime)
  
  const lock = (regEndDate < currentDate) ? true : false;

    return (
    
      <div className="spec_items" >
          
        <div className="spec_items_rowtop">
          <div >{props.itemdata[id].event} / {props.itemdata[id].event2}</div>
          <div >{props.itemdata[id].place}</div>
        </div>

        <div className="spec_items_row">
          <div >{date}</div>
          <div >{props.itemdata[id].city}</div>
        </div>
    
        <div className="spec_items_row">
          <div >{props.itemdata[id].timestart} - {props.itemdata[id].timeend}</div>
          <div >{props.itemdata[id].address}</div>
        </div>

        <div className="spec_screens">
          <IOData data={inOutData} id={id} itemdata={props.itemdata}/>
        </div>
        
        <div className="spec_items_row">
          <form id="comment_form" onSubmit={handleComment}>
            <textarea value={comment} onChange={handleChange} placeholder="Kirjoita kommentti..." rows="1"></textarea>
            <button type="submit">Kommentoi</button>
          </form>
        </div>

        <div className="spec_items_row">
          <div >Ilmoittautuminen päättyy:</div>
        </div>

        <div className="spec_items_row">
          <div >{regdate} klo: {props.itemdata[id].regendt}</div>
        </div>

        <div className="spec_items_row">
          <div ><button className={buttonIn} disabled={lock}
                                                 onClick={handleIn}>IN: 
                                                 {props.itemdata[id].usersIn}</button></div>
          <div ><button className={buttonOut} disabled={lock}
                                                 onClick={handleOut}>OUT: 
                                                 {props.itemdata[id].usersOut}</button></div>
        </div>

        <div className="spec_items_rowbottom">
        
          <div ><button className="spec_button" onClick={goBack}>Takaisin etusivulle</button></div>
        </div>

      </div>
    )
}



export default SpecItem
