import { convertirFormatoFecha } from "../utils"

export default function ModalSearch({ selectedVideo, setSelectedVideo }) {
    console.log(selectedVideo)
    const handleDelete = async () =>{
        const response = await fetch('/api/videos', {
            method:'DELETE',
            body: JSON.stringify({video_id: selectedVideo.video_id})
        })
        setSelectedVideo(null)
        if(response.ok){
            window.location.reload()
        }
    }

    const handleWatch = () => {
        window.location.href = '/'
    }

    return(<>
        <div class={`fixed z-10 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)]`} onClick={()=>(setSelectedVideo(null))}></div>
        <div class={`absolute z-50 flex flex-col align-between justify-between bg-white rounded-2xl w-full md:w-fit md:px-4 h-1/3 p-2 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`} id="modal_container">
            <section class="flex flex-col items-start h-100">
                <strong class="text-md md:text-xl mb-3">¿Qué quiere hacer con el siguiente video?</strong>
                <span class="text-sm md:text-md">Nombre: {selectedVideo.name}</span>
                <span class="text-sm md:text-md">Cancha: {selectedVideo.field_name}</span>
                <span class="text-sm md:text-md">Fecha: {convertirFormatoFecha(selectedVideo.date)}</span>
                <span class="text-sm md:text-md">Horario: {selectedVideo && selectedVideo.start_time.slice(0,-3)} a {selectedVideo && selectedVideo.end_time.slice(0,-3)}</span>
            </section>
            <section class="flex justify-end gap-2 mt-6">
                <button class="cursor-pointer rounded-2xl bg-red-400 border text-white text-l text-regular p-3 px-5 disabled:bg-primary_disabled" onClick={handleDelete}>Eliminar</button>
                <button class="cursor-pointer rounded-2xl bg-primary border text-white text-l text-regular p-3 px-5 disabled:bg-primary_disabled" onClick={()=>(setSelectedVideo(null))}>Cancelar</button>
                <button class="cursor-pointer rounded-2xl bg-primary border text-white text-l text-regular p-3 px-5 disabled:bg-primary_disabled" onClick={handleWatch}>Ver</button>
            </section>
        </div>
    </>)
}