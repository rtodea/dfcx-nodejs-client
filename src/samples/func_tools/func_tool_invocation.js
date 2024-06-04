import {
  request,
  sendMessageViaHttpToDFCX,
  sessionPath,
  startUserAndAgentInteractionLoop,
  uniqueSessionId
} from "../../common.js";

const DEV_Agent_FuncTool = 'ab6334d6-124b-4a1b-b79c-c80d8a1638ef';

async function appBuilderFuncToolInvocation(){
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Agent_FuncTool);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('DEV_Agent_FuncTool', 'Agent Session', currentSession);

  await startUserAndAgentInteractionLoop(sendMessage, [
      'Hi!',
      'I live in New York City. Can you tell me the water quality in my area?',
      'Are you sure this is correct?'
  ]);
}

async function main() {
  await appBuilderFuncToolInvocation();
}

main();
