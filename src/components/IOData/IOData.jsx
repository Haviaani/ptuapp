import './IOData.css'

function IOData({data, ...props}) {

  // Listaa käyttäjien ilmoittautumistiedot tapahtumalle

  const indata = data[props.id].indata
  const outdata = data[props.id].outdata
  const tododata = data[props.id].tododata

  return (
    <div className="data">
      <div className="data_screen">
        {indata.map((item, index) => (
          <div className="indata" key={index}>
            {item}
          </div> ))}
      </div>
      <div className="data_screen">
        {outdata.map((item, index) => (
          <div className="outdata" key={index}>
            {item}
          </div> ))}
      </div>
      <div className="data_screen">
        {tododata.map((item, index) => (
          <div className="tododata" key={index}>
            {item}
          </div> ))}
      </div>  
      <div className="data_screen_info">
        <div className="info">{props.itemdata[props.id].info}</div>
      </div> 
    </div>
    
  )
}

export default IOData
