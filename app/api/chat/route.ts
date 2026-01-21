import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  // Extract the messages from the request body
  const { messages } = req.json();

  // Ensure the messages adhere to the ModelMessages interface, which
  // is `streamText` expects.
  //
  // We do this because the type of the incoming `messages` differs depending on
  // whether we receive them from a user vs receive them from an LLM. User messages
  // have `content` already included, so in that case we simply include it. LLM
  // messages contain `parts` instead of `content`, so if `parts` is present, we
  // need to extract the text from it and set it in the `content` field.
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
