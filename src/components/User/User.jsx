import './User.css'


function User(props) {

  const checkPassword = (event) => {
 
    event.preventDefault()

    console.log(props.localdata)
  
    var form = document.getElementById('password')
        
    console.log(form.password.value)
    console.log(form.passwordconfirm.value)
    console.log(props.userdata[props.localdata.nameid].password)

    let newlocaldata = {...props.localdata}

    if (form.password.value === form.passwordconfirm.value) {
      if (form.password.value != "") {
        if (form.passwordold.value === props.userdata[props.localdata.nameid].password) {
          newlocaldata.newpw1 = form.password.value 
          newlocaldata.newpw2 = form.passwordconfirm.value
          props.handlePassword(newlocaldata)
          alert("Salasana vaihdettu!")

        } else if (form.password.value.length < 5) {  
          alert("Salasana liian lyhyt. Vähimmäispituus 5")

         } else {
           alert ("Vanha salasana ei täsmää")
         }

      } else {
        alert ("Salasana ei voi olla tyhjä")
      }

    } else if (form.password.value !== form.passwordconfirm.value) {
      alert("Salasanat eivät täsmää")
    }
      
  }
  
 
  return (
    <>
      <div>
        Tervetuloa {props.localdata.loginname} 
      </div>

      <div>
        <form onSubmit={checkPassword} id="password">
          Anna uusi salasana: <input type="password" name="password"></input> <br />
          Anna salasana uudestaan: <input type="password" name="passwordconfirm"></input> <br />
          Anna vanha salasana: <input type="password" name="passwordold"></input> <br />
          <button type="submit">Aseta uusi salasana</button> <br /> <br />
        </form>
        <br />    
      </div>
    </>
  )
}

export default User
