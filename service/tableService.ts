import {
  ServiceResponse,
  TableQuery,
  TableService,
  common,
  createTableService,
} from "azure-storage";

const tableService: TableService = createTableService(
  process.env.AZURE_STORAGE_ACCOUNT,
  process.env.AZURE_STORAGE_ACCESS_KEY
);

const insert = async <T>(tableName: string, entity: T) => {
  return new Promise((resolve, reject) => {
    tableService.insertEntity(
      tableName,
      entity,
      {
        echoContent: true,
        payloadFormat: "application/json;odata=nometadata",
      },
      (error: Error, result, response: ServiceResponse) => {
        if (error) {
          reject(error);
        }

        resolve(response.body);
      }
    );
  });
};

const update = async <T>(tableName: string, entity: T) => {
  return new Promise((resolve, reject) => {
    tableService.mergeEntity(
      tableName,
      entity,
      {
        echoContent: true,
        payloadFormat: "application/json;odata=nometadata",
      } as common.RequestOptions,
      (error: Error, result, response: ServiceResponse) => {
        if (error) {
          reject(error);
        }

        resolve(response.body);
      }
    );
  });
};

const query = async (tableName: string, query: TableQuery) => {
  return new Promise((resolve, reject) => {
    tableService.queryEntities(
      tableName,
      query,
      null,
      {
        echoContent: true,
        payloadFormat: "application/json;odata=nometadata",
      },
      (error: Error, result, response: ServiceResponse) => {
        if (error) {
          reject(error);
        }

        resolve(response.body);
      }
    );
  });
};

const remove = async (tableName: string, entity) => {
  return new Promise((resolve, reject) => {
    tableService.deleteEntity(
      tableName,
      entity,
      (error: Error, response: ServiceResponse) => {
        if (error) {
          reject(error);
        }

        resolve(response);
      }
    );
  });
};

export { insert, update, query, remove };