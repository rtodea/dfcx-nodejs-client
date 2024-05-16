import {HarmBlockThreshold, HarmCategory, VertexAI} from "@google-cloud/vertexai";

async function streamGenerateContent() {

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

async function main() {
  await streamGenerateContent();
}

main();
