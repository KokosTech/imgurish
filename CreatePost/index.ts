import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { saveImage } from "../service/blobService";
import { insert } from "../service/tableService";

type PostReq = {
  title: string;
  description: string;
  image: string;
  filename: string;
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const board = context.bindingData.board;

    if (!req.body) {
      context.res = {
        status: 400,
        body: "Please pass a post in the request body",
      };
      return;
    }

    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.filename
    ) {
      context.res = {
        status: 400,
        body: "Please pass a post in the request body",
      };
      return;
    }

    const postReq = req.body as PostReq;

    const imageUrl = await saveImage(
      postReq.image,
      postReq.filename,
      postReq.title
    );

    if (!imageUrl) {
      context.res = {
        status: 500,
        body: "Error saving image",
      };
      return;
    }

    const entity = {
      PartitionKey: { _: board },
      RowKey: { _: new Date().getTime().toString() },
      title: { _: postReq.title },
      description: { _: postReq.description },
      image: { _: imageUrl },
      created: { _: new Date().toISOString() },
    };

    const result = await insert("Posts", entity);

    context.res = {
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

export default httpTrigger;
