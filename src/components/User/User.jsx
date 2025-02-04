import './User.css'

function User(props) {

  const checkPassword = (event) => {
  
    event.preventDefault()
  
    var form = document.getElementById('password')
        
    if (form.password.value != form.passwordconfirm.value) {

      props.localdata.status = "Salasanat eivät täsmää"
  
    } if (form.password.value.length <= 7) {
  
      props.localdata.status = "Salasana on liian lyhyt"

    } else {

      props.localdata.newpw1 = form.password.value 
      props.localdata.newpw2 = form.passwordconfirm.value

      props.localdata.status  = "Salasana on vaihdettu"

    }
    
    props.handlePassword()
      
  }
  
 
  return (
    <>
          <div>
        Tervetuloa {props.localdata.loginname1} {props.localdata.loginname2}
      </div>

      <div>
        <form onSubmit={checkPassword} id="password">
          Anna uusi salasana: <input type="password" name="password"></input> <br />
          Anna salasana uudestaan: <input type="password" name="passwordconfirm"></input> <br />
          <button type="submit">Aseta uusi salasana</button> <br /> <br />
        </form>
        <input value={props.localdata.status}></input><br />
        

      </div>
    </>
  )
}

export default User
