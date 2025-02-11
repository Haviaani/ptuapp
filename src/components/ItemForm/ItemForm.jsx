import './ItemForm.css'
import useForm from '../../shared/useform/useform'
import { useNavigate } from 'react-router-dom'

function ItemForm(props) {

    const navigate = useNavigate()

    const dateToday = new Date().toLocaleDateString("fi-FI")

    const submit = () => {
        let storedValues = Object.assign({}, values)
        let x = 1
        const index = Object.keys(props.placedata).findIndex(key => key = storedValues.place)
        storedValues.id = storedValues.id ? storedValues.id : x = 0
        storedValues.id = storedValues.id ? storedValues.id : props.itemdata.length.toString()
        storedValues.address = props.placedata[index].address
        storedValues.city = props.placedata[index].city
        storedValues.usersIn = 0
        storedValues.usersOut = 0
        props.onItemSubmit(storedValues)

        if (x === 0) {
        let newinoutdata = JSON.parse(JSON.stringify(props.inOutData))
        let index = props.itemdata.length.toString()
        newinoutdata.push({id: index, indata: ["IN:",], outdata: ["OUT:",], tododata: ["?:",]})
            for (let i = 0; i < props.userdata.length; i++) {
                console.log(props.userdata[i].name2)
                newinoutdata[index].tododata.push(props.userdata[i].name2)
        }
        props.onInOutSubmit(newinoutdata)
        }

        navigate(-1)
    }

    let places = []

    for (let i = 0; i < props.placedata.length; i++) {
        places.push(props.placedata[i].place)
    }

    const initialState = props.formData ? props.formData : {
        id: "",
        eventname: "",
        timestart: "",
        timeend: "",
        date: "",
        place: "",
        address: "",
        city: "",
        usersIn: "",
        usersOut: "",
        info: "",
    }

    const {values, handleChange, handleSubmit} = useForm(submit, initialState, false)

    const handleCancel = () => {
        navigate(-1)
    }

    const handleDelete = () => {
        props.onItemDelete(values.id)
        navigate(-1)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="itemform">

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='event'>Tapahtuma</label>
                            <select name='event' onChange={handleChange} value={values.event} >
                                <option value="">(valitse)</option>
                                <option >Harjoitukset </option>
                                <option >Turnaus</option>
                                <option >Talkoot</option>
                                <option >Muu tapahtuma</option>                                                           
                            </select>
                        </div>
                    </div>

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='event2'>Harjoitus</label>
                            <select name='event2' onChange={handleChange} value={values.event2} 
                                                  disabled={values.event == "Harjoitukset" ? "" : 'true'}   >
                                <option value="">(valitse)</option>
                                <option >Laji</option>
                                <option >Fysiikka</option>
                                <option >Lenkki</option>
                                <option >Peli</option>                                                           
                            </select>
                        </div>
                    </div>

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='timestart'>Alkaa</label>
                            <input type='time' name='timestart' onChange={handleChange} value={values.timestart} />
                        </div>
                    </div>

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='timeend'>Loppuu</label>
                            <input type='time' name='timeend' onChange={handleChange} value={values.timeend}/>
                        </div>
                    </div>

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='date'>Päivämäärä</label>
                            <input type='date' name='date' onChange={handleChange} value={values.date}/>
                        </div>
                    </div>

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='place'>Paikka</label>
                            <select name='place' onChange={handleChange} value={values.place}>
                            <option value="">(valitse)</option>
                            {places.map(place => <option key={place}>{place}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="itemform_row">
                        <div>
                            <label htmlFor='regendd'>Ilmoittautuminen loppuu</label>
                            <input type='date' name='regendd' onChange={handleChange} value={values.regendd} />
                            <input type='time' name='regendt' onChange={handleChange} value={values.regendt} />
                        </div>
                    </div>


                    <div className="itemform_row">
                        <div>
                            <label htmlFor='info'>Lisäinfo</label>
                            <input type='text' name='info' onChange={handleChange} value={values.info} />
                        </div>
                    </div>
                    
                    <div className="itemform_row">
                        <div>
                            <button onClick={handleCancel}>PERUUTA</button>
                        </div>
                        <div>
                            <button 
                                    disabled={values.event &&
                                              values.timestart &&
                                              values.timeend &&
                                              values.date &&
                                              values.place ? "" : 'true'} 
                                    type='submit'>
                                    { props.formData ? "TALLENNA" : "LISÄÄ" }
                            </button>
                        </div>
                    </div>

                    { props.onItemDelete ?
                    <div className="itemform_row">
                        <div>
                            <button  onClick={handleDelete}>POISTA</button>    
                        </div>
                        <div></div>
                    </div>
                    : null }

                </div>
            </form>
        </div>
    )
}

export default ItemForm