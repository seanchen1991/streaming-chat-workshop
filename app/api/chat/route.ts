import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  // Extract the messages from the request body
  const { messages } = await req.json();

  console.log(`Chat route received the following messages: ${messages}`);

  // Call the OpenAI API with streaming enabled
  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: 'You are a helpful assistant.',
    messages,
  });

  // Return the streaming response
  return result.toTextStreamResponse();
}
