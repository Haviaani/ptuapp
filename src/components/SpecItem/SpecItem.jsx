import { useEffect } from 'react'
import './SpecItem.css'
import { useLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import IOData from '../IOData'

function SpecItem(props) {

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

    return (
    
      <div className="spec_items" >
          
        <div className="spec_items_rowtop">
          <div >{props.itemdata[id].event}</div>
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
          <IOData data={inOutData} id={id} />
        </div>
        
        <div className="spec_items_row">
          <div >Ilmoittautuminen päättyy:</div>
        </div>

        <div className="spec_items_row">
          <div >{regdate} klo: {props.itemdata[id].regendt}</div>
        </div>

        <div className="spec_items_rowbottom">
          <div ><button className="spec_button1" onClick={handleIn}>IN: {props.itemdata[id].usersIn}</button></div>
          <div ><button className="spec_button2" onClick={handleOut}>OUT: {props.itemdata[id].usersOut}</button></div>
        </div>

        <div className="spec_items_row">
        
          <div ><button className="spec_button" onClick={goBack}>Takaisin etusivulle</button></div>
        </div>

      </div>
    )
}



export default SpecItem
