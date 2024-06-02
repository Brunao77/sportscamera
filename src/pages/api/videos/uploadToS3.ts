import type { APIContext } from 'astro';
import { S3 } from "../../../s3.ts";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(context: APIContext){
    try {
        const contentDisposition = context.request.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        const keyS3 = filenameMatch ? filenameMatch[1] : 'default-filename';
        const buffer = await context.request.arrayBuffer();
        
        const params = {
            Bucket: import.meta.env.BUCKET_NAME,
            Key: keyS3,
            Body: Buffer.from(buffer),
        };
       
        await S3.send(new PutObjectCommand(params));

        return new Response('Video subido y datos guardados con éxito', { status: 200 });
        
    } catch (error) {
        console.error(error);
        return new Response('Error al procesar la solicitud', { status: 500 });
    }
}