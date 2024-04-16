import { useState, useEffect } from 'preact/hooks'

export default function VideoList({videos}) {
    const [listVideos, setListVideos] = useState(null)
    const [videoForDelete, setVideoForDelete] = useState(null)

    useEffect(()=>{
        setListVideos(videos)
    }, [])

    function convertirFormatoFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; 
        const anio = fecha.getFullYear();
        
        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const mesFormateado = mes < 10 ? `0${mes}` : mes;
        
        const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;
        
        return fechaFormateada;
    }

    const handleModalDelete = (video) =>{
        setVideoForDelete(video)
    }

    const handleCancel = () =>{
        setVideoForDelete(null)
    }

    const handleDelete = async () =>{
        const response = await fetch('/api/videos', {
            method:'DELETE',
            body: JSON.stringify({video_id: videoForDelete.video_id})
        })
        setVideoForDelete(null)
        if(response.status === 200){
            const updatedList = listVideos.filter(video => video !== videoForDelete);
            setListVideos(updatedList);
        }
    }

    const handleFilter = () =>{
       const reversedList = [...listVideos].reverse()
       setListVideos(reversedList)
    }

    return (
        <>
            <div class="flex">
                <span>Ordenar por</span>
                <select class="outline-none" onChange={handleFilter}>
                    <option value='most_recent'>Mas reciente</option>
                    <option value='older'>Mas antiguo</option>
                </select>
            </div>
            <div class="overflow-scroll max-h-[50vh] md:max-h-[70vh] md:w-[400px]">
                {listVideos && listVideos.map((video)=>{
                        const {name, field_name, date, start_time, end_time} = video
                        return(
                        <div class="flex items-center justify-between pr-3">
                            <div class="flex items-center">
                                <svg width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#969696" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M10 4l4 16" /><path d="M12 12l-8 2" />
                                </svg>
                                <div class="flex flex-col">
                                    <strong class="text-start text-xl text-primary font-medium">{name}</strong>
                                    <div class="flex gap-4 text-terciary text-wrap">
                                        <span class="md:text-nowrap text-xs md:text-l">{field_name}</span>
                                        <span class="md:text-nowrap text-xs md:text-l">{convertirFormatoFecha(date)}</span>
                                        <span class="md:text-nowrap text-xs md:text-l">{start_time.slice(0,-3)} a {end_time.slice(0,-3)}</span>
                                    </div>
                                </div>
                            </div>
                            <span class="font-bold text-2xl text-red-600 cursor-pointer" onClick={()=>handleModalDelete(video)}>X</span>
                        </div>
                    )
                })}
           </div>
           {/* MODAL FOR DELETE */}
           {videoForDelete && <>
                <div class={`fixed z-10 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)]`} onClick={()=>(setVideoForDelete(null))}></div>
                <div class={`absolute z-50 flex flex-col align-between justify-between bg-white rounded-2xl w-fit h-1/3 p-2 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`} id="modal_container">
                    <section class="flex flex-col items-start h-100">
                        <strong class="text-md md:text-xl mb-3">¿Seguro que quiere eliminar el siguiente video?</strong>
                        <span class="text-sm md:text-md">Nombre: {videoForDelete.name}</span>
                        <span class="text-sm md:text-md">Cancha: {videoForDelete.field_name}</span>
                        <span class="text-sm md:text-md">Fecha: {convertirFormatoFecha(videoForDelete.date)}</span>
                        <span class="text-sm md:text-md">Horario: {videoForDelete && videoForDelete.start_time.slice(0,-3)} a {videoForDelete && videoForDelete.end_time.slice(0,-3)}</span>
                    </section>
                    <section class="flex justify-end gap-2 mt-6">
                        <button class="cursor-pointer rounded-2xl bg-primary text-white text-l text-regular p-3 px-5" id="cancel_btn" onClick={handleCancel}>Cancelar</button>
                        <button class="cursor-pointer rounded-2xl bg-primary text-white text-l text-regular p-3 px-5" onClick={handleDelete}>Eliminar</button>
                    </section>
                </div>
            </>
            }
        </>
    )
}