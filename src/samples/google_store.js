import {
  request,
  sendMessageViaHttpToDFCX,
  sessionPath,
  startUserAndAgentInteractionLoop,
  uniqueSessionId
} from "../common.js";

const DEV_Google_Store_AgentId = '7abed82d-1336-459d-80d3-46b55841b0cc';

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

const main = async () => {
  await googleStoreSession();
}

main();
