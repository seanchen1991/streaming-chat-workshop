import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  // Extract the messages from the request body
  const { messages } = await req.json();

  // Call the API with streaming enabled
  const result = streamText({
    model: anthropic('claude-3-haiku-20240307'),
    system: 'You are a helpful assistant.',
    messages,
  });

  // Return the streaming response
  return result.toUIMessageStreamResponse();
}
