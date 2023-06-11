import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient("pictures");

export const saveImage = async (
  image: string,
  filename: string,
  title: string
): Promise<string | null> => {
  const blockBlobClient = containerClient.getBlockBlobClient(
    new Date().getTime().toString() + "-" + title + "-" + filename
  );

  const base64Image = image.split(";base64,").pop();
  if (!base64Image) return null;

  const imageBuffer = Buffer.from(base64Image, "base64");
  await blockBlobClient.upload(imageBuffer, imageBuffer.length);

  return blockBlobClient.url;
};
