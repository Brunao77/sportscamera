import { useState, useEffect } from 'preact/hooks'

export default function FormSearchVideoUser({establishment_id}) {
    const [selects, setSelects] = useState({field: {value:'', options: []}, date: {value:'', options: []}, hour: {value:'', options: []}})

    useEffect(async ()=>{
        const today = new Date();
        const dates = []
        // Iterar para los últimos 7 días, empezando desde hoy
        for (let i = 0; i <= 7; i++) {
            let date = new Date();
            date.setDate(today.getDate() - i);

            // Formatear la fecha (puedes personalizar el formato según tus necesidades)
            const formattedDate = ("0" + date.getDate()).slice(-2) +"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+date.getFullYear();

            dates.push({value:formattedDate, text:formattedDate})
        }

        const {cameras} = await fetch(`/api/camera/${establishment_id}`).then((response) => response.json())
        const optionsFields = cameras.map(({camera_id, field_name})=> ({value:camera_id, text: field_name}))

        setSelects((prevState) => ({ ...prevState, date: {value: '', options: dates}, field: {value: '', options: optionsFields}}))
    }, [])

    const handleChangeField = async ({target}) =>{
        setSelects((prevState) => ({ ...prevState, field: {value: target.value, options: prevState.field.options}, date:{value:'', options:prevState.date.options}, hour: {value:'', options: []}}))
    }

    const handleChangeDate = async ({target}) =>{
        const selectedDate = target.value;
        const selectedField = selects.field.value
        

        const {videos} = await fetch(`/api/videos/videoTurns`,{
            method:'POST',
            body: JSON.stringify({camera_id:selectedField, date:selectedDate})
        }).then((response) =>
			response.json()
		);

        const turnsOptions = videos.map(({start_time, end_time})=>{
            return {value: `${start_time}-${end_time}` , text: `${start_time.slice(0, -3)} - ${end_time.slice(0, -3)}`}
        })
        
        setSelects((prevState) => ({ ...prevState, date: {value: selectedDate, options: prevState.date.options}, hour: {value: '', options: turnsOptions}}))
    }
  
    return (
        <>
            <form class="flex flex-col z-0 gap-3 w-full">
                <select required disabled={!selects.field.options.length} onChange={handleChangeField} value={selects.field.value} class="border w-full border-primary disabled:border-gray-200 border-2 outline-none cursor-pointer rounded-lg p-2 focus:ring-primary focus:border-primary">
                    <option hidden value=''>Cancha</option>
                    {selects.field.options && selects.field.options.map(({value, text})=>{
                        return <option value={value}>{text}</option>
                    })}
                </select>
                <select required disabled={!selects.field.value} onChange={handleChangeDate} value={selects.date.value} class="border w-full border-primary disabled:border-gray-200 border-2 outline-none cursor-pointer rounded-lg p-2 focus:ring-primary focus:border-primary">
                    <option hidden value=''>Dia</option>
                    {selects.date.options && selects.date.options.map(({value, text})=>{
                        return <option value={value}>{text}</option>
                    })}
                </select>
                <select required disabled={!selects.hour.options.length} value={selects.hour.value} class="border w-full border-primary disabled:border-gray-200 border-2 outline-none cursor-pointer rounded-lg p-2 focus:ring-primary focus:border-primary">
                    <option hidden value=''>Hora</option>
                    {selects.hour.options.length ? selects.hour.options.map(({value, text})=>{
                        return <option value={value}>{text}</option>
                    }) : <option disabled>No hay turnos para este dia</option>}
                </select>
                <button type='submit' class="cursor-pointer rounded-2xl bg-primary border text-white text-l text-regular p-3 px-5">BUSCAR</button>
            </form>
        </>
    )
  }