import type { APIContext } from "astro";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { S3 } from "../../../../s3";

export async function GET(context: APIContext): Promise<Response> {
    const { key } = context.params;
    try {
        const command = new PutObjectCommand({ Bucket: import.meta.env.BUCKET_NAME , Key: key });
        const signedURL = await getSignedUrl(S3, command, { expiresIn: 3600 });
        return new Response(JSON.stringify({ signedURL }), {
            status:200, 
        });
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
}