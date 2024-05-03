import { useState, useEffect } from 'preact/hooks'
import { getLastDays } from '../utils'
import Select from './Select.jsx'
import ModalSearch from './ModalSearch.jsx'

export default function FormSearchVideoUser({establishment_id}) {
    const [selects, setSelects] = useState({field: {value:'', options: []}, date: {value:'', options: []}, hour: {value:'', options: []}})
    const [listVideos, setListVideos] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)

    useEffect(async ()=>{
        const dates = getLastDays()
        const optionsFields = await fetch(`/api/camera/${establishment_id}`)
        .then(async (response) => {
            const { cameras } = await response.json()
            return cameras.map(({camera_id, field_name})=> ({value:camera_id, text: field_name}))
        })

        setSelects((prevState) => ({ ...prevState, date: {value: '', options: dates}, field: {value: '', options: optionsFields}}))
    }, [])

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
        setListVideos(videos)
        const turnsOptions = videos.map(({start_time, end_time})=>{
            return {value: `${start_time}-${end_time}` , text: `${start_time.slice(0, -3)} - ${end_time.slice(0, -3)}`}
        })
        
        setSelects((prevState) => ({ ...prevState, date: {value: target.value, options: prevState.date.options}, hour: {value: '', options: turnsOptions}}))
    }

    const handleChangeHour = ({target}) =>{
        setSelects((prevState) => ({ ...prevState, hour: {value: target.value, options: prevState.hour.options}}))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        const searchedVideo = [...listVideos].find(({start_time, end_time}) => {
            return `${start_time}-${end_time}` ===  selects.hour.value
        })
        setSelectedVideo(searchedVideo)
    }
  
    return (
        <>
            <form class="flex flex-col z-0 gap-3 w-full" onSubmit={handleSubmit}>
                <Select placeholder='Cancha' disabled={!selects.field.options.length} option={selects.field} onChange={handleChangeField} />
                <Select placeholder='Día' disabled={!selects.field.value} option={selects.date} onChange={handleChangeDate} />
                <Select placeholder='Hora' disabled={!selects.hour.options.length} option={selects.hour} onChange={handleChangeHour} />
                <button type='submit' class="flex items-center justify-center cursor-pointer rounded-2xl bg-primary border text-white text-l text-regular p-3 px-5 disabled:bg-primary_disabled">BUSCAR</button>
            </form>
            {selectedVideo && <ModalSearch selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />}
        </>
    )
  }