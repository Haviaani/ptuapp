import './PlaceForm.css'
import useForm from '../../shared/useform/useform'
import { useNavigate } from 'react-router-dom'

function PlaceForm(props) {

    const navigate = useNavigate()

    const submit = () => {
        let storedValues = Object.assign({}, values)
        storedValues.id = storedValues.id ? storedValues.id : props.placedata.length.toString()
        storedValues.city = storedValues.postal + " " + storedValues.precity
        props.onPlaceSubmit(storedValues)
        navigate(-1)
    }

    const initialState = props.formData ? props.formData : {
        id: "",
        place: "",
        address: "",
        postal: "",
        precity: "",
        shortname: "",
    }

    const {values, handleChange, handleSubmit} = useForm(submit, initialState, false)

    const handleCancel = () => {
        navigate(-1)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="placeform">

                    <div className="placeform_row">
                        <div>
                            <label htmlFor='place'>Paikka</label>
                            <input type='text' name='place' onChange={handleChange} value={values.place} />
                        </div>
                    </div>

                    <div className="placeform_row">
                        <div>
                            <label htmlFor='address'>Osoite</label>
                            <input type='text' name='address' onChange={handleChange} value={values.address}/>
                        </div>
                    </div>

                    <div className="placeform_row">
                        <div>
                            <label htmlFor='postal'>Postinumero</label>
                            <input type='text' name='postal' onChange={handleChange} value={values.postal}/>
                        </div>
                    </div>

                    <div className="placeform_row">
                        <div>
                            <label htmlFor='precity'>Kaupunki</label>
                            <input type='text' name='precity' onChange={handleChange} value={values.precity}/>
                        </div>
                    </div>

                    <div className="placeform_row">
                        <div>
                            <label htmlFor='shortname'>Lyhyt nimi</label>
                            <input type='text' name='shortname' onChange={handleChange} value={values.shortname}/>
                        </div>
                    </div>

                    <div className="placeform_row">
                        <div>
                            <button type="button" className="placebutton" onClick={handleCancel}>PERUUTA</button>
                        </div>
                        <div>
                            <button className="placebutton"
                                    disabled={values.place &&
                                              values.address &&
                                              values.postal &&
                                              values.precity ? "" : true} 
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

export default PlaceForm