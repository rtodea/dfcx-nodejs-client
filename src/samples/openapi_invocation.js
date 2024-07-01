import {
  request,
  sendMessageViaHttpToDFCX,
  sessionPath,
  startUserAndAgentInteractionLoop,
  uniqueSessionId
} from "../common.js";

const DEV_OpenAPI_Invocation = '6cbeee48-0222-4903-bd81-3edaee7397a2';

async function appBuilderFuncToolInvocation(){
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_OpenAPI_Invocation);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('DEV_OpenAPI_Invocation', 'Agent Session', currentSession);

  await startUserAndAgentInteractionLoop(sendMessage, [
    'yes',
    // What are your first 8 digits?
    '4242 4242',
    // The card issuer is Stripe Payments Uk Limited.
  ]);
}

async function main() {
  await appBuilderFuncToolInvocation();
}

main();
