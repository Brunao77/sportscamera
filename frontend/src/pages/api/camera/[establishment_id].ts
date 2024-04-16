import type { APIContext } from "astro";
import { CameraModel } from "../../../models/camera.js";

export async function GET(context: APIContext): Promise<Response> {
    const { establishment_id } = context.params;

    if (!establishment_id)
        return new Response(JSON.stringify({message:"Los campos son requeridos"}), {
            status: 400
        });
    
    const cameras = await CameraModel.getAll({establishment_id});
  
    if (!cameras) return new Response(JSON.stringify({message:"No existen camaras"}), {
        status: 400
    });
  
    return new Response(JSON.stringify({message:"Camaras con exito", cameras}), {
        status: 200
    }); 
}