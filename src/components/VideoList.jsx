import { useState, useEffect } from 'preact/hooks'
import  ModalForDelete from './ModalForDelete'
import { convertirFormatoFecha } from '../utils'

export default function VideoList({videos}) {
    const [listVideos, setListVideos] = useState(null)
    const [videoForDelete, setVideoForDelete] = useState(null)

    useEffect(()=>{
        setListVideos(videos)
    }, [])

    const handleFilter = () =>{
       const reversedList = [...listVideos].reverse()
       setListVideos(reversedList)
    }

    return (
        <>
            <div class="flex">
                <span>Ordenar por</span>
                <select class="outline-none" onChange={handleFilter}>
                    <option value='most_recent'>Más reciente</option>
                    <option value='older'>Más antiguo</option>
                </select>
            </div>
            <div class="overflow-auto h-full pb-5">
                {listVideos && listVideos.map((video)=>{
                        const { field_name, date, start_time, end_time} = video
                        return(
                        <div class="flex items-center justify-between pr-3">
                            <div class="flex items-center">
                                <svg width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#969696" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M10 4l4 16" /><path d="M12 12l-8 2" />
                                </svg>
                                <div class="flex flex-col">
                                    <strong class="text-start text-xl text-primary font-medium">{field_name}</strong>
                                    <div class="flex gap-4 text-terciary text-wrap">
                                        <span class="md:text-nowrap text-xs md:text-l">{convertirFormatoFecha(date)}</span>
                                        <span class="md:text-nowrap text-xs md:text-l">{start_time.slice(0,-3)} a {end_time.slice(0,-3)}</span>
                                    </div>
                                </div>
                            </div>
                            <span class="font-bold text-2xl text-red-600 cursor-pointer" onClick={()=>setVideoForDelete(video)}>X</span>
                        </div>
                    )
                })}
           </div>
           {videoForDelete && <ModalForDelete listVideos={listVideos} setListVideos={setListVideos} videoForDelete={videoForDelete} setVideoForDelete={setVideoForDelete} />}
        </>
    )
}