import './UserForm.css'
import useForm from '../../shared/useform/useform'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

function UserForm(props) {

    const navigate = useNavigate()

    const submit = async () => {
        let storedValues = Object.assign({}, values)
        let x = 1
        storedValues.id = storedValues.id ? storedValues.id : x = 0     
        storedValues.id = storedValues.id ? storedValues.id : props.userdata.length.toString()
        storedValues.name1 = storedValues.firstname + " " + storedValues.lastname
        storedValues.name2 = storedValues.firstname + " " + storedValues.nro
        storedValues.login = storedValues.firstname + storedValues.nro

        // Lisää salasanaan suolaa ja salauksen. Jos käyttäjä on uusi.
        if (x === 0) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(storedValues.firstname + storedValues.nro, salt)

        storedValues.password = hashPassword
        storedValues.in = 0
        storedValues.out = 0
        storedValues.accesslevel = 1
        }

        props.onUserSubmit(storedValues)        

        navigate(-1)
    }

    const initialState = props.formData ? props.formData : {
        id: "",
        firstname: "",
        lastname: "",
        name1: "",
        name2: "",
        nro: "",
        login: "",
        password: "",
        in: 0,
        out: 0,
        role: "",
        accesslevel: 1,
    }

    const {values, handleChange, handleSubmit} = useForm(submit, initialState, false)

    const handleCancel = () => {
        navigate(-1)
    }

    const handleDelete = () => {
        props.onUserDelete(values.id)
        navigate(-1)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="userform">

                    <div className="userform_row">
                        <div>
                            <label htmlFor='firstname'>Etunimi</label>
                            <input type='text' name='firstname' onChange={handleChange} value={values.firstname} />
                        </div>
                    </div>

                    <div className="userform_row">
                        <div>
                            <label htmlFor='lastname'>Sukunimi</label>
                            <input type='text' name='lastname' onChange={handleChange} value={values.lastname}/>
                        </div>
                    </div>

                    <div className="userform_row">
                        <div>
                            <label htmlFor='nro'>Pelinumero</label>
                            <input type='text' name='nro' onChange={handleChange} value={values.nro}/>
                        </div>
                    </div>

                    <div className="userform_row">
                        <div>
                            <label htmlFor='role'>Rooli</label>
                            <select name='role' onChange={handleChange} value={values.role}>
                            <option>(valitse)</option>
                            <option>Maalivahti</option>
                            <option>Kenttäpelaaja</option>
                            <option>Valmentaja</option>
                            <option>Toimihenkilö</option>
                            </select>
                        </div>
                    </div>


                    
                    <div className="itemform_row">
                        <div>
                            <button type="button" className="userbutton" onClick={handleCancel}>PERUUTA</button>
                        </div>
                        <div>
                            <button className="userbutton"
                                    disabled={values.firstname &&
                                              values.lastname &&
                                              values.nro &&
                                              values.role ? "" : true} 
                                    type='submit'>
                                    { props.formData ? "TALLENNA" : "LISÄÄ" }
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default UserForm