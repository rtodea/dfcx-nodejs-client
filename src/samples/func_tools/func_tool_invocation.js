import {
  request,
  sendMessageViaHttpToDFCX,
  sessionPath,
  startUserAndAgentInteractionLoop,
  uniqueSessionId
} from "../../common.js";

const DEV_Prebuilt_Retail_Playbook_AgentId = '565978b6-f65a-4031-980a-441032ca038e';

async function appBuilderFuncToolInvocation(){
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Prebuilt_Retail_Playbook_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('DEV_Prebuilt_Retail_Playbook_AgentId', 'Agent Session', currentSession);

  await startUserAndAgentInteractionLoop(sendMessage, [
    'Hi! I want to buy a laptop.',
    'I want to ask for the temperature of a city like New York.',
    // it breaks here when `response.queryResult.responseMessages[0].responseType` is `RESPONSE_TYPE_UNSPECIFIED`
    'New York',
    'Can tell me the New York city Temperature?'
  ]);
}

async function main() {
  await appBuilderFuncToolInvocation();
}

main();
