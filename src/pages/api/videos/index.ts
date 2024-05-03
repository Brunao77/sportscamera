import { UserModel } from "../../../models/user.js"
import { VideosModel } from "../../../models/videos.js"
import type { APIContext } from 'astro';

export async function GET(context: APIContext){ //GET ALL VIDEOS FROM ESTABLISHMENT
    if(!context.locals.session)
        return new Response(JSON.stringify({message: "Acceso no autorizado"}),{status:401})
    
    const { userId: user_id } = context.locals.session;

    const { establishment_id } = await UserModel.profile({
      user_id,
    });

    if (!establishment_id)
      return new Response(JSON.stringify({message: "No hay establecimientos relacionados"}), {status:400})

    const videos = await VideosModel.getAll({ establishment_id });

    if (!videos) return new Response(JSON.stringify({message:"No hay videos"}), {status:400})

    return new Response(JSON.stringify({message:"Videos con exito", videos}), {status:200})
}

export async function DELETE(context: APIContext){

  const { video_id } =  await context.request.json()

  if (!video_id)
    return new Response(JSON.stringify({message:"Los campos son requeridos"}), {
      status: 400
    });

  const result = await VideosModel.delete({ video_id });

  if(!result) return new Response(JSON.stringify({message:"No se ha eliminado el video"}), {
    status: 400
  })

  return new Response(JSON.stringify({message:"Video eliminado con exito"}), {
    status: 200
  })
}