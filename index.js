const {SessionsClient} = require('@google-cloud/dialogflow-cx');
const {v4} = require('uuid');
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

const sendMessageViaHttpToDFCX =(request) => (text) => {
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

const main = async () => {
  await googleStoreSession();
  await bloodDonationSession();
}

main();
