import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  // Extract the messages from the request body
  const body = await req.json();
  console.log('Request body:', JSON.stringify(body, null, 2));
  const { messages } = body;
  const modelMessages = messages.map((msg: any) => ({
    role: msg.role,
    content: msg.content ?? msg.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join(''),
  }));

  // Call the API with streaming enabled
  const result = streamText({
    model: anthropic('claude-3-haiku-20240307'),
    system: 'You are a helpful assistant.',
    messages: modelMessages,
  });

  // Return the streaming response
  return result.toUIMessageStreamResponse();
}
