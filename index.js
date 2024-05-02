const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {v4} = require('uuid');
const {VertexAI, HarmCategory, HarmBlockThreshold} = require("@google-cloud/vertexai");
// kAdedqVo-...
const DEV_Google_Store_AgentId = '7abed82d-1336-459d-80d3-46b55841b0cc';
const DEV_Lifeblood_Donation_Agent_AgentId = '2ca1d6d4-433b-46a6-8c75-2752329c438c';

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
    console.log('agent response:', response);
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
const googleStoreSession = async () => {

  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Google_Store_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('Agent Session', currentSession);
  const messagesFromUser = [
    'hi',
    'tell me about the latest Pixel phone'
  ];

  console.log('user says:', messagesFromUser[0]);
  let agentResponse = await sendMessage(messagesFromUser[0]);
  console.log('agent says:', unpackAgentResponse(agentResponse));

  console.log('user says:', messagesFromUser[1]);
  agentResponse = await sendMessage(messagesFromUser[1]);
  console.log('agent says:', unpackAgentResponse(agentResponse));
}

const bloodDonationSession = async () => {
  const messagesFromUser = [
    'hi',
    'I want to donate blood',
    'Yes', // I want to take the eligibility quiz
    '35', // My age
    '74' // My weight
  ];
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Lifeblood_Donation_Agent_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('Agent Session', currentSession);
  console.log('user says:', messagesFromUser[0]);
  let agentResponse = await sendMessage(messagesFromUser[0]);
  console.log('agent says:', unpackAgentResponse(agentResponse));

  console.log('user says:', messagesFromUser[1]);
  agentResponse = await sendMessage(messagesFromUser[1]);
  console.log('agent says:', unpackAgentResponse(agentResponse));

  console.log('user says:', messagesFromUser[2]);
  agentResponse = await sendMessage(messagesFromUser[2]);
  console.log('agent says:', unpackAgentResponse(agentResponse));

  console.log('user says:', messagesFromUser[3]);
  agentResponse = await sendMessage(messagesFromUser[3]);
  console.log('agent says:', unpackAgentResponse(agentResponse));

  console.log('user says:', messagesFromUser[4]);
  agentResponse = await sendMessage(messagesFromUser[4]);
  console.log('agent says:', unpackAgentResponse(agentResponse));
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

const main = async () => {
  /* await googleStoreSession();
   await bloodDonationSession();*/
  await streamGenerateContent();
  // await simpleAiPlatformCall();
}

main();
