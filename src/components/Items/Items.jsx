import './Items.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import info from '../../assets/images/info.svg'
import chat from '../../assets/images/comments.svg'
import edit from '../../assets/images/edit.svg'
import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Items(props) {

  const itemsFromLoader = useLoaderData();
  const [items, setItems] = useState([]);

  // Järjestelee tapahtumat (itemit) päivämääräjärjestykseen.

  useEffect(() => {

    const sortedItems = [...itemsFromLoader].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate - bDate;
    });

    setItems(sortedItems);
  }, [itemsFromLoader])
   
  const currentDate = new Date()

  const upcomingEvents = props.itemdata.filter(item => {
    const eventDate = new Date(`${item.date}T${item.timeend}:00`)
    return eventDate >= currentDate   
  })

  return (
    <>  
  
  { upcomingEvents.map(function(itemdata) {

    let id = itemdata.id
    let commentLock = true

    // Kutsutaan handleIn tai handleOut ja lähetetään id mukana.

    const handleIn = (id) => {
      props.onHandleIn(id)
    }
  
    const handleOut = (id) => {
      props.onHandleOut(id)
    }

    // Hakee kommenttien määrän datan pituuden (length) mukaan ja antaa 0, jos tyhjä.

    const commentsAmount = props.commentdata[id] ? props.commentdata[id].comments.length : 0

    // Kommentointien lukemisen linkki käyttää alla olevaa lukitsemiseen, jos kommenttien määrä on 0.

    if (commentsAmount > 0) {
      commentLock = false
    }    

    // Painikkeiden värin ja määritysten valinta omakohtaisen In- tai Out-datan perusteella.
    
    let inColor = false
    let outColor = false

    if (props.inOutData[id].indata.includes(props.localdata.name)) {
      inColor = true
    }

    if (props.inOutData[id].outdata.includes(props.localdata.name)) {
      outColor = true
    }

    const buttonIn = inColor ? 'button1_true' : 'button1_false'

    const buttonOut = outColor ? 'button2_true' : 'button2_false'

    const date = new Date(itemdata.date).toLocaleDateString("fi-FI")

    const currentDate = new Date()
    const dateTime = `${itemdata.regendd}T${itemdata.regendt}:00`;
    const regEndDate = new Date(dateTime)

    // Poistaa ilmoittautumisnapit käytöstä, jos ilmoittautumisaika on mennyt.

    const lock = (regEndDate < currentDate); 

      return (
        <div className="items" key={itemdata.id}>
          
          <div className="items_rowtop">
            <div className="left_top">{itemdata.event}</div>
            <div className="center_top"><Link to={"/edititem/" + itemdata.id} style={{pointerEvents: props.localdata.accesslevel < 2 ? 'none' : 'auto'}}><img src={edit} /></Link></div>
            <div className="right_top">{itemdata.place}</div>
          </div>

          <div className="items_row">
            <div className="row_left">
              <div className="row_up">
                {date}
              </div>
              <div className="row_down">
                {itemdata.timestart} - {itemdata.timeend}
              </div>
            </div>            
            <div className="row_center"><NavLink to={"/comments/" + itemdata.id} style={{pointerEvents: commentsAmount === 0 ? 'none' : 'auto'}}><img src={chat} />
              <span className="comments_amount">{commentsAmount}</span></NavLink></div>
            <div className="row_right">
              <div className="row_up">
                {itemdata.address}
              </div>
              <div className="row_down">
                {itemdata.city}
              </div>
            </div>
          </div>

          <div className="items_rowbottom">
            <div className="left_bottom"><button className={buttonIn} disabled={lock}
                                                 onClick={() => handleIn(id)}>IN: {itemdata.usersIn}</button></div>
            <div className="center_bottom"><Link to={"/specitem/" + itemdata.id}><img src={info} /></Link></div>
            <div className="right_bottom"><button className={buttonOut} disabled={lock}
                                                  onClick={() => handleOut(id)}>OUT: {itemdata.usersOut}</button></div>
          </div>   

        </div>
      )
    })}
    </>
  )
}

export default Items
