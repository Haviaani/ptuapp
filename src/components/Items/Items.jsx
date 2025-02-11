import './Items.css'
import React from 'react'
import { Link } from 'react-router-dom'
import info from '../../assets/images/info.svg'

function Items(props) {

  let data = props.itemdata.slice()

  data.sort( (a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return aDate - bDate
  })

  let today = new Date().toLocaleDateString("fi-FI");
  console.log(today)
   
  return (
    <>
  
  {data.map(function(itemdata) {

    let id = itemdata.id

    const handleIn = () => {
      props.onHandleIn(id)
    }
  
    const handleOut = () => {
      props.onHandleOut(id)
    }

  const date = new Date(itemdata.date).toLocaleDateString("fi-FI")
    
      return (
        <div className="items" key={itemdata.id}>
          
          <div className="items_rowtop">
            <div className="left"><Link to={"/edit/" + itemdata.id}>{itemdata.event}</Link></div>
            <div className="right">{itemdata.place}</div>
          </div>

          <div className="items_row">
            <div className="left">{date}</div>
            <div className="right">{itemdata.city}</div>
          </div>
          
          <div className="items_row">
            <div className="left">{itemdata.timestart} - {itemdata.timeend}</div>
            <div className="right">{itemdata.address}</div>
          </div>

          <div className="items_rowbottom">
            <div className="left_bottom"><button className="button1" onClick={handleIn}>IN: {itemdata.usersIn}</button></div>
            <div className="center_bottom"><Link to={"/spec/" + itemdata.id}><img src={info} /></Link></div>
            <div className="right_bottom"><button className="button2" onClick={handleOut}>OUT: {itemdata.usersOut}</button></div>
          </div>

        </div>
      )
    })}
    </>
  )
}

export default Items
