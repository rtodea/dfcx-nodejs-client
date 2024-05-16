import {
  request,
  sendMessageViaHttpToDFCX,
  sessionPath,
  startUserAndAgentInteractionLoop,
  uniqueSessionId
} from "../common.js";

const DEV_Lifeblood_Donation_Agent_AgentId = '2ca1d6d4-433b-46a6-8c75-2752329c438c';

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
  await bloodDonationSession();
}

main();
