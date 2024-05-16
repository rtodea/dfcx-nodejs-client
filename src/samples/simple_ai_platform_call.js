import {EndpointServiceClient} from "@google-cloud/aiplatform";

async function simpleAiPlatformCall() {

  const projectId = 'api-project-604594715070';
  const location = 'global'

// Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };
  const client = new EndpointServiceClient(clientOptions);

  async function listEndpoints() {
    // Configure the parent resource
    const parent = `projects/${projectId}/locations/${location}`;
    const request = {
      parent,
    };

    // Get and print out a list of all the endpoints for this resource
    const [result] = await client.listEndpoints(request);
    for (const endpoint of result) {
      console.log(`\nEndpoint name: ${endpoint.name}`);
      console.log(`Display name: ${endpoint.displayName}`);
      if (endpoint.deployedModels[0]) {
        console.log(
          `First deployed model: ${endpoint.deployedModels[0].model}`
        );
      }
    }
  }

  return listEndpoints();
}

async function main() {
  await simpleAiPlatformCall();
}

main();
