import { useState, useEffect } from 'preact/hooks'
import { getLastDays } from '../utils'
import Select from './Select.jsx'

export default function FormSearchVideo({options}) {
    const [selects, setSelects] = useState({establishment: {value: '', options:[]}, field: {value:'', options: []}, date: {value:'', options: []}, hour: {value:'', options: []}})
    const [videosList, setVideoList] = useState(null)

    useEffect(()=>{
        const dates = getLastDays()
        setSelects((prevState) => ({ ...prevState, establishment: {value: '',  options}, date: {value: '', options: dates}}))
    }, [])

    const handleChangeEstablishment = async ({target}) =>{
        const optionsFields = await fetch(`/api/camera/${target.value}`).then(async (response) => {
            const { cameras } = await response.json()
            return cameras.map(({camera_id, field_name})=> ({value:camera_id, text: field_name}))
        });
        setSelects((prevState) =>({ ...prevState, establishment: {value: target.value, options: prevState.establishment.options}, field: {value: '', options: optionsFields}, date:{value:'', options:prevState.date.options}, hour: {value:'', options: []} }))
    }

    const handleChangeField = async ({target}) =>{
        setSelects((prevState) => ({ ...prevState, field: {value: target.value, options: prevState.field.options}, date:{value:'', options:prevState.date.options}, hour: {value:'', options: []}}))
    }

    const handleChangeDate = async ({target}) =>{
        const { videos } = await fetch(`/api/videos/videoTurns`,{
            method:'POST',
            body: JSON.stringify({camera_id: selects.field.value, date:target.value})
        }).then((response) =>
			response.json()
		);
        setVideoList(videos)
        
        const turnsOptions = videos.map(({start_time, end_time})=>{
            return {value: `${start_time}-${end_time}` , text: `${start_time.slice(0, -3)} - ${end_time.slice(0, -3)}`}
        })
        
        setSelects((prevState) => ({ ...prevState, date: {value: target.value, options: prevState.date.options}, hour: {value: '', options: turnsOptions} }))
    }

    const handleChangeHour = ({target}) =>{
        setSelects((prevState) => ({ ...prevState, hour: {value: target.value, options: prevState.hour.options}}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        const selectedVideo = [...videosList].find(({start_time, end_time}) => {
            return `${start_time}-${end_time}` ===  selects.hour.value
        })
    }
  
    return (
        <>
            <form class="flex flex-col gap-5 w-2/3" onSubmit={handleSubmit}>
                <Select placeholder='Predio' option={selects.establishment} handleOnChange={handleChangeEstablishment} />
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
                <select required disabled={!selects.hour.options.length} value={selects.hour.value} onChange={handleChangeHour} class="border w-full border-primary disabled:border-gray-200 border-2 outline-none cursor-pointer rounded-lg p-2 focus:ring-primary focus:border-primary">
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