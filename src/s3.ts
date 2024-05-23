import { S3Client } from "@aws-sdk/client-s3"

export const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${import.meta.env.ACCOUNTIDS3}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: import.meta.env.ACCESSKEYIDS3,
      secretAccessKey: import.meta.env.SECRETACCESSKEYS3,
    },
});