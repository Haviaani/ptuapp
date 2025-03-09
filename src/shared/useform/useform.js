import { useState } from 'react'

const useForm = (callback, initialState={}, resetOnSubmit=true) => {

    // Esitellään useState-hooks, johon käyttäjän lomakkeelle syöttämä tieto tallennetaan
    const [values, setValues] = useState(initialState)

    // Syötekäsittelijä, joka tallentaa kentän tiedot sen nimellä state-muuttujaan
    const handleChange = (event) => {
        // Tallennetaan kenttään syötetty arvo ja kentän nimi välimuuttujiin
        const value = event.target.value
        const key = event.target.name

    // Jos kenttä on timestart, lasketaan timeend ja regendt automaattisesti
        if (key === 'timestart') {
   
        const start = new Date(`1970-01-01T${value}:00Z`);
        const newRegEndT = start.toISOString().substring(11, 16); // Muotoa HH:mm
        start.setMinutes(start.getMinutes() + 90);  // Lisää 90 minuuttia (1h 30min)
        const newTimeEnd = start.toISOString().substring(11, 16); // Muotoa HH:mm

        setValues(prevValues => ({
            ...prevValues,
            [key]: value,
            timeend: newTimeEnd,
            regendt: newRegEndT
        }));

    // Jos kenttä on date, lasketaan regendd automaattisesti        
        } else if (key === 'date') {

        const reg = new Date(value);
        reg.setDate(reg.getDate() - 1)
        const newRegEnd = reg.toISOString().split('T')[0]
        
        setValues(prevValues => ({
            ...prevValues,
            [key]: value,
            regendd: newRegEnd
        }));  

        } else {
        // Muu kenttä, käsitellään normaalisti
        setValues(prevValues => ({ ...prevValues, [key]: value }));
        }
    }

    // Submit-käsittelijä, joka estää oletustoiminnan ja kutsuu määriteltyä callback-funktiota
    // Alustaa tarvittaessa lomaketiedot alkutilanteesseen
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        callback()
        if (resetOnSubmit) resetValues()
    }

    // Funktio, joka palauttaa lomakkeen tiedot alkutilanteeseen
    const resetValues = () => {
        setValues(initialState)
    }

    // Palauta luonnin yhteydessä sekä käsittelijät, että tilamuuttuja
    return {
        handleChange,
        handleSubmit,
        resetValues,
        setValues,
        values
    }

}

export default useForm