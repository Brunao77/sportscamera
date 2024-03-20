import { useState, useEffect } from 'preact/hooks'

export default function FormSearchVideoUser({options}) {
    const [selects, setSelects] = useState({establishment: {value: '', options:[]}, field: {value:'', options: []}, date: {value:'', options: []}, hour: {value:'', options: []}})

    useEffect(()=>{
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
        setSelects((prevState) => ({ ...prevState, establishment: {value: '',  options}, date: {value: '', options: dates} }))
    }, [])

    const handleChangeEstablishment = async ({target}) =>{
        const fields = await fetch(`http://localhost:3000/api/camera/${target.value}`).then((response) =>
			response.json()
		);
		const optionsFields = fields.map(({camera_id, field_name})=> ({value:camera_id, text: field_name}))

        setSelects((prevState) =>({ ...prevState, establishment: {value: target.value, options: prevState.establishment.options, isOpen: false}, field: {value: '', options: optionsFields}, date:{value:'', options:prevState.date.options}, hour: {value:'', options: []} }))
    }

    const handleChangeField = async ({target}) =>{
        setSelects((prevState) => ({ ...prevState, field: {value: target.value, options: prevState.field.options}, date:{value:'', options:prevState.date.options}, hour: {value:'', options: []}}))
    }

    const handleChangeDate = async ({target}) =>{
        const selectedDate = target.value;
        const selectedField = selects.field.value
        

        const turns = await fetch(`http://localhost:3000/api/videos/${selectedField}&${selectedDate}`).then((response) =>
			response.json()
		);

        const turnsOptions = turns.map(({start_time, end_time})=>{
            return {value: `${start_time}-${end_time}` , text: `${start_time.slice(0, -3)} - ${end_time.slice(0, -3)}`}
        })
        
        setSelects((prevState) => ({ ...prevState, date: {value: selectedDate, options: prevState.date.options}, hour: {value: '', options: turnsOptions} }))
    }
  
    return (
        <>
            <form class="flex flex-col gap-3 w-full">
                {/*<div class='relative'>
                    <section class="flex text-terciary border rounded-xl w-full border-primary disabled:border-gray-200 border-2 cursor-pointer p-2" onClick={()=>setSelects((prevState) =>({ ...prevState, establishment: {value: prevState.establishment.value, options: prevState.establishment.options, isOpen: !prevState.establishment.isOpen}}))}>
                        <svg width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#969696" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M0 0h24v24H0z" stroke="none"/><path d="M11 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0M3 17l5 1 .75-1.5M14 21v-4l-4-3 1-6"/><path d="M6 12V9l5-1 3 3 3 1"/><path d="M19.5 20a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor"/>
                        </svg>
                        <span>Predio</span>
                    </section>
                    {selects.establishment.isOpen && <ul class="max-h-44 overflow-y-scroll absolute bg-white w-full text-black cursor-pointer rounded-xl p-2">
                        {selects.establishment.options && selects.establishment.options.map(({value, text})=>{
                            return <li class='hover:bg-primary hover:text-white w-full' value={value}>{text}</li>
                        })}
                    </ul>}
                </div>*/}
                <select required onChange={handleChangeEstablishment} class="border border-primary disabled:border-gray-200 border-2 w-full outline-none cursor-pointer rounded-lg p-2 overflow-y-scroll">
                    <option hidden >Predio</option>
                    {selects.establishment.options && selects.establishment.options.map(({value, text})=>{
                        return <option value={value}>{text}</option>
                    })}
                </select>
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