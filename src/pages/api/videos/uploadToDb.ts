import type { APIContext } from 'astro';
import { VideosModel } from '../../../models/videos.js';

export async function POST(context: APIContext){
    try {
        const {date, start_time, end_time, video_url, camera_id} = await context.request.json()

        await VideosModel.insert({ date, start_time, end_time, video_url, camera_id })
        return new Response('Video subido con éxito', { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response('Error al procesar la solicitud', { status: 500 });
    }
}