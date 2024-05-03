import { UserModel } from "../../../models/user.js"
import { VideosModel } from "../../../models/videos.js"
import type { APIContext } from 'astro';

export async function POST(context: APIContext){ //GET ALL VIDEOS FOR FIELD AND DATE
    const { camera_id, date } = await context.request.json()

    const videos = await VideosModel.getVideoTurns({ camera_id, date });

    if (!videos)
      return new Response(JSON.stringify({message: "No existen videos para esa cancha y ese dia"}), { status:400 })
  
    return new Response(JSON.stringify({message: "Videos con exito", videos}), { status:200 })
}