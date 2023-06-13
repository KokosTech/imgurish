# imgurish

The serverless REST API, similar to Imgur, is an anonymous image-sharing platform built on Azure Functions with Node.js. It leverages the serverless architecture to eliminate the need for managing and scaling traditional servers. Users can upload images without the requirement of creating an account or providing any personal information. The API handles image uploads, generates unique URLs for each image, and allows users to retrieve and view the shared images anonymously. With the serverless infrastructure, the platform offers efficient image hosting and sharing while maintaining user privacy.

## What is imgurish built on?

Imgurish utilizes a tech stack consisting of Node.js for its API development, Azure Blob Storage for image storage, and Azure Functions for serverless architecture. On the frontend, Next.js, a React framework, is employed along with Vercel for hosting and deployment. This combination of technologies enables the efficient handling of images, seamless API interactions, and a dynamic and responsive user interface for a high-quality user experience.

## Why Azure and Functions?

Azure and Azure Functions were chosen for their robust cloud infrastructure and serverless capabilities. Azure provides a reliable and scalable platform for hosting applications, while Azure Functions offer the ability to execute code in a serverless environment, providing cost-efficiency and automatic scaling based on demand. This combination allows for flexible and efficient deployment of the Imgurish application, ensuring high availability and optimal resource utilization.

## REST-API Endpoints

- CreatePost: [POST] /api/boards/{board}/posts

Request:
```json
{
    "title": "string",
    "description": "string",
    "filename": "string",
    "image": "base64 contents of an image",
}
```

Response: 
```json
{
    "value": {
      "PartitionKey": "BOARD",
      "RowKey": "POST_ID",
      "Timestamp": "TIME",
      "title": "TITLE",
      "description": "DESC",
      "image": "URL_TO_IMG",
      "created": "SIMPLE_CREATED_TIME"
    },
}
```

- DeletePost: [DELETE] /api/boards/{board}/posts/{post} - deletes a post
- GetAllBoards: [GET] /api/boards

Response:
```json
{
  ["board1", "board2", ..., ""boardN]
}
```

- GetAllPosts: [GET] /api/feed - gets list of all posts
- GetBoard: [GET] api/boards/{board} - gets list of posts in a board
- GetPost: [GET] /api/boards/{board}/posts/{id} - gets a single post

## Demo

You can try out this application either on your local development environment using the Azure extension in VS Code or by visiting the frontend that has been specifically developed for this API. The frontend can be accessed at https://imgurish-frontend.vercel.app.

## Development and Deployment

To create an Azure Functions and Storage Account, as well as set up a table and a blob container, and deploy the project to Azure using your GitHub account and repository, follow these steps:

### Create an Azure Functions and Storage Account:
- Go to the Azure portal (portal.azure.com) and sign in to your account.
- Click on "Create a resource" and search for "Azure Functions" in the search bar.
- Select "Azure Functions" from the results and click on "Create."
- Fill in the required information such as subscription, resource group, function app name, runtime stack (Node.js), etc.
- Click on "Review + create" and then "Create" to provision the Azure Functions.
- Similarly, create a Storage Account by searching for "Storage Account" in the Azure portal and following the steps.
- Create a Table and Blob Container:
- Once the Storage Account is created, navigate to the Storage Account resource in the Azure portal.
- Under the "Services" section, select "Tables" and create a new table by providing a name and any desired properties.
- Similarly, under the "Services" section, select "Containers" and create a new blob container by providing a name and the desired access level.
- 
### Connect GitHub Account and Repository:
- In the Azure portal, navigate to your Azure Functions resource.
- Under the "Functions" section, click on "Add" to add a new function.
- Select "GitHub Actions" as the deployment method.
- Follow the prompts to authorize Azure to access your GitHub account.
- Select your repository and branch that contains the Azure Functions project.

### Deploy the Project to Azure:
- Make sure your Azure Functions project is committed and pushed to the specified branch in your GitHub repository.
- Azure will automatically detect the changes in your repository and trigger the deployment process.
- The deployment will build and deploy your Azure Functions project to the specified Azure Functions resource.
- You can monitor the deployment progress in the Azure portal.
- Once the deployment is complete, your Azure Functions and Storage Account will be set up, and your project will be deployed and ready to use.

### TLDR

Azure's Web GUI empowers you to effortlessly create and deploy projects on Azure, without the need for any command-line instructions, setting it apart from AWS.

## Future development

In future development, incorporating an optional profile system would enhance the project's functionality. This would enable users to not only edit or delete their own posts but also like and save others' content. To facilitate this, an authentication layer would be introduced to the API. With the authentication layer, additional roles such as moderators and admins could be implemented, granting specific privileges to manage posts. Currently, the ability to delete posts requires access to the Azure private key, but with roles in place, authorized personnel could perform these actions without direct access to the private key.

In future updates, a more efficient approach for handling images can be implemented by transferring them separately using dedicated protocols instead of relying on base64 encoding. Leveraging Azure Blob Storage for image storage can enhance performance and scalability. The API would generate unique identifiers for each image, allowing clients to upload images directly to Azure Blob Storage via HTTP or a storage SDK. Additionally, implementing pagination in the API and enabling infinite scroll on the frontend can improve organization and navigation, ensuring a smoother user experience.
