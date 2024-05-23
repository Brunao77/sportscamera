import type { APIContext } from "astro";

export async function GET(context: APIContext): Promise<Response> {
    const { video_url } = context.params;

    if (!video_url)
        return new Response(JSON.stringify({message:"Los campos son requeridos"}), {
            status: 400
        });

    try {
        const response = await fetch(import.meta.env.BUCKET_URL + video_url);
        if (!response.ok)
          return new Response('Video not found', { status: 404 });
        
        const videoStream = response.body;
        return new Response(videoStream, {
            status:200, 
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });
      } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
      }
}