import {SessionsClient} from '@google-cloud/dialogflow-cx';
import {v4} from 'uuid';

// The credentials are loaded from GOOGLE_APPLICATION_CREDENTIALS env variable
const client = new SessionsClient();

export const sessionPath = (sessionId, agentId) => {
  const projectId = 'api-project-604594715070';
  const location = 'global';
  return `projects/${projectId}/locations/${location}/agents/${agentId}/sessions/${sessionId}`;
}

export const request = (sessionPath) => (text) => ({
  session: sessionPath,
  queryInput:
    {
      text: {
        text,
      },
      languageCode: 'en',
    }
});

export const sendMessageViaHttpToDFCX = (request) => (text) => {
  return client.detectIntent(request(text)).then(([response]) => {
    // console.log('agent response:', response);
    return response;
  }).catch((e) => {
    console.error(e)
  });
};

export const sendMessageViaStreamToDFCX = (request) => (text) => {
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

export const unpackAgentResponse = (response) => {
  return response?.queryResult.responseMessages[0].text.text[0];
};

export const uniqueSessionId = () => {
  return v4().split('-')[0];
};

export const startUserAndAgentInteraction = async (sendMessage, userText) => {
  console.log('user says:', userText);
  const agentResponse = await sendMessage(userText);
  console.log('agent says:', unpackAgentResponse(agentResponse));
}

export const startUserAndAgentInteractionLoop = async (sendMessage, messagesFromUser) => {
  for (const message of messagesFromUser) {
    await startUserAndAgentInteraction(sendMessage, message);
  }
}
