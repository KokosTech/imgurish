import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { remove } from "../service/tableService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { board, id } = context.bindingData;

    const entity = {
      PartitionKey: { _: board },
      RowKey: { _: id.toString() },
    };

    await remove("Posts", entity);
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

export default httpTrigger;
