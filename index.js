const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {v4} = require('uuid');
const {VertexAI, HarmCategory, HarmBlockThreshold} = require("@google-cloud/vertexai");
// kAdedqVo-...
const DEV_Google_Store_AgentId = '7abed82d-1336-459d-80d3-46b55841b0cc';
const DEV_Lifeblood_Donation_Agent_AgentId = '2ca1d6d4-433b-46a6-8c75-2752329c438c';
const DEV_Prebuilt_Retail_Playbook_AgentId = '565978b6-f65a-4031-980a-441032ca038e';

// The credentials are loaded from GOOGLE_APPLICATION_CREDENTIALS env variable
const client = new SessionsClient();

const sessionPath = (sessionId, agentId) => {
  const projectId = 'api-project-604594715070';
  const location = 'global';
  return `projects/${projectId}/locations/${location}/agents/${agentId}/sessions/${sessionId}`;
}

const request = (sessionPath) => (text) => ({
  session: sessionPath,
  queryInput:
    {
      text: {
        text,
      },
      languageCode: 'en',
    }
});


const sendMessageViaStreamToDFCX = (request) => (text) => {
  const stream = client.serverStreamingDetectIntent(request(text));
  stream.on('data', (response) => {
    console.log('agent response:', `${JSON.stringify(response)}`);
  });
  stream.on('error', (error) => {
    console.error(error);
  });
  stream.on('end', (d) => {
    console.log('end', d)
  })
};

const sendMessageViaHttpToDFCX = (request) => (text) => {
  return client.detectIntent(request(text)).then(([response]) => {
    // console.log('agent response:', response);
    return response;
  }).catch((e) => {
    console.error(e)
  });
};

const unpackAgentResponse = (response) => {
  return response?.queryResult.responseMessages[0].text.text[0];
};

const uniqueSessionId = () => {
  return v4().split('-')[0];
}

const startUserAndAgentInteraction = async (sendMessage, userText) => {
  console.log('user says:', userText);
  const agentResponse = await sendMessage(userText);
  console.log('agent says:', unpackAgentResponse(agentResponse));
}

const startUserAndAgentInteractionLoop = async (sendMessage, messagesFromUser) => {
  for (const message of messagesFromUser) {
    await startUserAndAgentInteraction(sendMessage, message);
  }
}

const googleStoreSession = async () => {
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Google_Store_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('DEV_Google_Store_AgentId', 'Agent Session', currentSession);
  await startUserAndAgentInteractionLoop(sendMessage, [
    'hi',
    'do you have phones?'
  ]);
}

const bloodDonationSession = async () => {
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Lifeblood_Donation_Agent_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));
  console.log('DEV_Lifeblood_Donation_Agent', 'Agent Session', currentSession);

  await startUserAndAgentInteractionLoop(sendMessage, [
    'hi',
    'I want to donate blood',
    'Yes', // I want to take the eligibility quiz
    '35', // My age
    '74' // My weight
  ]);
}

async function streamGenerateContent() {
  const {
    FunctionDeclarationSchemaType,
    HarmBlockThreshold,
    HarmCategory,
    VertexAI
  } = require('@google-cloud/vertexai');

  const project = 'api-project-604594715070';
  const location = 'us-central1';
  const textModel = 'gemini-1.0-pro';
  const visionModel = 'gemini-1.0-pro-vision';

  const vertexAI = new VertexAI({project: project, location: location});

// Instantiate Gemini models
  const generativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safetySettings: [{
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    }],
    generationConfig: {maxOutputTokens: 256},
  });

  const generativeVisionModel = vertexAI.getGenerativeModel({
    model: visionModel,
  });

  const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: textModel,
  });

  const request = {
    contents: [{role: 'user', parts: [{text: 'How are you doing today?'}]}],
  };
  const streamingResult = await generativeModel.generateContentStream(request);
  for await (const item of streamingResult.stream) {
    console.log('stream chunk: ', JSON.stringify(item));
  }
  const aggregatedResponse = await streamingResult.response;
  console.log('aggregated response: ', JSON.stringify(aggregatedResponse));
}

async function simpleAiPlatformCall() {
  const {EndpointServiceClient} = require('@google-cloud/aiplatform');

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

async function appBuilderResponse() {
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Prebuilt_Retail_Playbook_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  await startUserAndAgentInteractionLoop(sendMessage, [
    'Hi, I want to select a product',
    'I want to search for a product',
    'What kind of products do you have?',
    'I am interested in laptops',
    'What types of laptops do you have?',
    'What business laptops do you have?',
    'What is the RAM on these?',
    'Okay, and what is the price?',
  ]);
}

const main = async () => {
  /* await googleStoreSession();
   await bloodDonationSession();*/
  // await streamGenerateContent();
  // await simpleAiPlatformCall();
  await appBuilderResponse();
}

main();
