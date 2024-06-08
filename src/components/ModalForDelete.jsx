import { convertirFormatoFecha } from "../utils"

export default function ModalForDelete({ listVideos, setListVideos, videoForDelete, setVideoForDelete }) {
    const handleDelete = async () =>{
        setVideoForDelete(null)
        const toastSuccess = document.getElementById('toast_success')
        const toastInfo = document.getElementById('toast_info')
        const spinner = toastSuccess.querySelector('.spinner')
        const tick = toastSuccess.querySelector('.tick')
        toastInfo.innerText = `El video desde ${videoForDelete.start_time}hs está siendo eliminado`
        toastSuccess.classList.remove('hidden')
        await fetch('/api/videos', {
            method:'DELETE',
            body: JSON.stringify({video: videoForDelete})
        }).then(async (response)=>{
            if(response.status === 200){
                const { start_time } = await response.json()
                const updatedList = listVideos.filter(video => video !== videoForDelete);
                setListVideos(updatedList);
                spinner.classList.add('hidden')
                tick.classList.remove('hidden')
                toastInfo.innerText = `El video desde ${start_time}hs ha sido eliminado con éxito`
                setTimeout(() => {
                    toastSuccess.classList.add('hidden');
                }, 5000);
            }
        })
    }

    return(<>
        <div class={`fixed z-10 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)]`} onClick={()=>(setVideoForDelete(null))}></div>
        <div class={`absolute z-50 flex flex-col align-between justify-between bg-white rounded-2xl w-full md:w-fit md:px-4 h-1/3 p-2 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`} id="modal_container">
            <section class="flex flex-col items-start h-100">
                <strong class="text-md md:text-xl mb-3">¿Seguro que quiere eliminar el siguiente video?</strong>
                <span class="text-sm md:text-md">Cancha: {videoForDelete.field_name}</span>
                <span class="text-sm md:text-md">Fecha: {convertirFormatoFecha(videoForDelete.date)}</span>
                <span class="text-sm md:text-md">Horario: {videoForDelete && videoForDelete.start_time.slice(0,-3)} a {videoForDelete && videoForDelete.end_time.slice(0,-3)}</span>
            </section>
            <section class="flex justify-end gap-2 mt-6">
                <button class="cursor-pointer rounded-2xl bg-red-400 text-white text-l text-regular p-3 px-5" onClick={handleDelete}>Eliminar</button>
                <button class="cursor-pointer rounded-2xl bg-primary text-white text-l text-regular p-3 px-5" onClick={()=>(setVideoForDelete(null))}>Cancelar</button>
            </section>
        </div>
    </>)
}