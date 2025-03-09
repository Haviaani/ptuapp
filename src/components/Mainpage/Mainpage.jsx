import './Mainpage.css'
import Items from '../Items'

function Mainpage(props) {
  
  const currentDate = new Date()

  // Filteröi näkyviin tapahtumiin vain tulevat tapahtumat.

  const upcomingEvents = props.itemdata.filter(item => {
    const eventDate = new Date(Date.parse(item.date))
    return eventDate >= currentDate
  })

  return (
    <>
      <div className="content">
       <Items onHandleIn={props.onHandleIn}
              onHandleOut={props.onHandleOut}
              onHandleDelete={props.onHandleDelete}
              itemdata={upcomingEvents}
              inOutData={props.inOutData}
              localdata={props.localdata}
              commentdata={props.commentdata} />
      </div>
    </>
  )

}

export default Mainpage
