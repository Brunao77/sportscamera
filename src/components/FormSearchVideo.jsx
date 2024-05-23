import { useState, useEffect } from 'preact/hooks'
import { getLastDays } from '../utils'
import Select from './Select.jsx'

export default function FormSearchVideo({options}) {
    const [selects, setSelects] = useState({
        establishment: {value: '', options:[]}, 
        field: {value:'', options: []}, 
        date: {value:'', options: []}, 
        hour: {value:'', options: []}
    })
    const [videosList, setVideoList] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(true);

    useEffect(()=>{
        const dates = getLastDays()
        setSelects((prevState) => ({ 
            ...prevState, 
            establishment: {value: '',  options}, 
            date: {value: '', options: dates}
        }))
    }, [])

    const handleChangeEstablishment = async ({target}) =>{
        const optionsFields = await fetch(`/api/camera/${target.value}`).then(async (response) => {
            const { cameras } = await response.json()
            return cameras.map(({camera_id, field_name})=> ({value:camera_id, text: field_name}))
        });
        setSelects((prevState) =>({ 
            ...prevState, 
            establishment: {value: target.value, options: prevState.establishment.options}, 
            field: {value: '', options: optionsFields}, 
            date:{value:'', options:prevState.date.options}, 
            hour: {value:'', options: []} 
        }))
    }

    const handleChangeField = async ({target}) =>{
        setSelects((prevState) => ({ 
            ...prevState, 
            field: {value: target.value, options: prevState.field.options}, 
            date:{value:'', options:prevState.date.options}, 
            hour: {value:'', options: []}
        }))
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
        
        setSelects((prevState) => ({ 
            ...prevState, 
            date: {value: target.value, options: prevState.date.options}, 
            hour: {value: '', options: turnsOptions} 
        }))
    }

    const handleChangeHour = ({target}) =>{
        setSelects((prevState) => ({ 
            ...prevState, 
            hour: {value: target.value, options: prevState.hour.options}
        }))
        setIsSubmitting(false)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        setIsSubmitting(true);

        const { video_id } = [...videosList].find(({start_time, end_time}) => {
            return `${start_time}-${end_time}` ===  selects.hour.value
        })

        if(video_id){
            window.location.href = `player/${video_id}`
        }else{
            setIsSubmitting(false);
        }
    }
  
    return (
        <>
            <form class="flex flex-col gap-5 w-80" onSubmit={handleSubmit}>
                <Select placeholder='Predio' option={selects.establishment} onChange={handleChangeEstablishment} />
                <Select placeholder='Cancha' disabled={!selects.field.options.length} option={selects.field} onChange={handleChangeField} />
                <Select placeholder='Día' disabled={!selects.field.value} option={selects.date} onChange={handleChangeDate} />
                <Select placeholder='Hora' disabled={!selects.hour.options.length} option={selects.hour} onChange={handleChangeHour} />
                <button type='submit' class="cursor-pointer rounded-2xl bg-primary border text-white text-l text-regular p-3 px-5 disabled:bg-primary_disabled" disabled={isSubmitting}>BUSCAR</button>
            </form>

        </>
    )
  }