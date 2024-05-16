import {
  request,
  sendMessageViaHttpToDFCX,
  sessionPath,
  startUserAndAgentInteractionLoop,
  uniqueSessionId
} from "../common.js";

const DEV_Prebuilt_Retail_Playbook_AgentId = '565978b6-f65a-4031-980a-441032ca038e';

async function appBuilderResponse() {
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Prebuilt_Retail_Playbook_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('DEV_Prebuilt_Retail_Playbook_AgentId', 'Agent Session', currentSession);

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

async function main() {
  await appBuilderResponse();
}

main();
