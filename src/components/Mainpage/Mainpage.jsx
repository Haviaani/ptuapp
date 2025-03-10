import './Mainpage.css'
import Items from '../Items'

function Mainpage(props) {
  
  return (
    <>
      <div className="content">
       <Items onHandleIn={props.onHandleIn}
              onHandleOut={props.onHandleOut}
              onHandleDelete={props.onHandleDelete}
              itemdata={props.itemdata}
              inOutData={props.inOutData}
              localdata={props.localdata}
              commentdata={props.commentdata} />
      </div>
    </>
  )

}

export default Mainpage
