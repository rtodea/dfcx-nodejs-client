async function appBuilderFuncToolInvocation(){
  const sessionId = uniqueSessionId();
  const currentSession = sessionPath(sessionId, DEV_Prebuilt_Retail_Playbook_AgentId);
  const sendMessage = sendMessageViaHttpToDFCX(request(currentSession));

  console.log('DEV_Prebuilt_Retail_Playbook_AgentId', 'Agent Session', currentSession);

  await startUserAndAgentInteractionLoop(sendMessage, [
    'Hi! I want to buy a laptop.',
    'I want to ask for the temperature of a city like New York?',
    'New York'
  ]);
}

async function main() {
  await appBuilderFuncToolInvocation();
}

main();
