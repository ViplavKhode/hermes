import { S3 } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import fs from "fs";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-east-2",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
        },
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const command = new GetObjectCommand(params);
      const response = await s3.send(command);

      const file_name = `./tmp/hermesproject${Date.now().toString()}.pdf`;

      if (response.Body instanceof Readable) {
        const file = fs.createWriteStream(file_name);
        response.Body.pipe(file).on("finish", () => {
          resolve(file_name);
        }).on("error", (error) => {
          reject(error);
        });
      } else {
        reject(new Error("Response body is not a readable stream"));
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
