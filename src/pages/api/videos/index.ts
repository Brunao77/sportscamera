import { VideosModel } from "../../../models/videos.js"
import type { APIContext } from 'astro';
import { S3 } from "../../../s3.js";
import { ListObjectsCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";

export async function DELETE(context: APIContext){ //DELETE VIDEO FROM TABLE AND VIDEO IN BUCKET EXCEPT THE .TS UTILS FOR CLIPS
  const { video } =  await context.request.json()

  if (!video)
    return new Response(JSON.stringify({message:"Los campos son requeridos"}), {
      status: 400
    });
  
  const { video_id, camera_id, date, start_time } = video

  const result = await VideosModel.delete({ video_id });

  if(!result) return new Response(JSON.stringify({message:"No se ha eliminado el video"}), {
    status: 400
  })

  const newDate = new Date(date);
  const formatedDate = newDate.toISOString().split('T')[0];
  const formatedTime = start_time.split(':').slice(0, 2).join('-');

  const prefix = `${camera_id}a${formatedDate}a${formatedTime}a`

  const params = {
      Bucket: import.meta.env.BUCKET_NAME,
      Prefix: prefix
  };

  try {
      const { Contents } = await S3.send(new ListObjectsCommand (params));

      if (Contents && Contents.length > 0) {

        const deleteParams = {
          Bucket: import.meta.env.BUCKET_NAME,
          Delete: {
              Objects: Contents.map(obj => ({ Key: obj.Key }))
          }
        };
  
        try {
            await S3.send(new DeleteObjectsCommand(deleteParams));

            return new Response(JSON.stringify({start_time}), {
              status: 200
            })
        } catch (err) {
            console.error('Error borrando objetos:', err);
            throw err;
        }
      } else {
          return new Response(JSON.stringify({message:"No se encontraron objetos con el prefijo especificado"}), {
            status: 400
          })
      }
  } catch (err) {
      console.error('Error listando objetos:', err);
      throw err;
  }
}