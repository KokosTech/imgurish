import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { TableQuery } from "azure-storage";
import { query } from "../service/tableService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const q = new TableQuery().select("PartitionKey");
    const result = await query("Posts", q);
    const boards = new Set(result["value"]?.map((item) => item.PartitionKey));
    context.res = {
      body: boards,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

export default httpTrigger;
