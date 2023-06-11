import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { TableQuery } from "azure-storage";
import { query } from "../service/tableService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { board, id } = context.bindingData;
    const q = new TableQuery().where(
      "PartitionKey eq ? and RowKey eq ?",
      board,
      id.toString()
    );

    const result = await query("Posts", q);
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
