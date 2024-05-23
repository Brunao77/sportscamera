import type { APIContext } from 'astro';
import { S3 } from "../../../s3.ts";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { VideosModel } from '../../../models/videos.js';

export async function POST(context: APIContext){
    try {
        /*
        const formData = await context.request.formData();
        const files = formData.getAll('files');
        const folderName = formData.get('folderName');
        const endTime = new Date(formData.get('endTime'));

        for (const file of files) {
            const filePath = path.join(folderName, file);
            const s3Key = path.basename(filePath);
            try {
                const params = {
                    Bucket: import.meta.env.BUCKET_NAME,
                    Key: s3Key,
                    Body: fs.createReadStream(filePath),
                };
                await S3.send(new PutObjectCommand(params));
            } catch (error) {
                console.error("Error al subir el archivo a S3:", error);
            }
        }

        const data = folderName.split('a');
        const camera_id = data[0];
        const date = data[1];
        const start_time = data[2].replace(/-/g, ':');
        const end_time = endTime.toLocaleTimeString('en-US', { hour12: false }).slice(0, -3);
        const video_url = `${folderName}a.m3u8`;

        await VideosModel.insert({ date, start_time, end_time, video_url, camera_id })

        return new Response('Video subido y datos guardados con éxito', { status: 200 });
        */
    } catch (error) {
        console.error(error);
        return new Response('Error al procesar la solicitud', { status: 500 });
    }
    
}