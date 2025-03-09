import './Content.css'

function Content(props) {
  
  if (!props.children) {
    return <div>Ladataan sisältöä</div>
  }

  return (
    <div className="content">
      {props.children}
    </div>
  )
}

export default Content;