interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicContent {
  type: 'text';
  text: string;
}

interface AnthropicUsage {
  input_tokens: number;
  output_tokens: number;
}

export interface AnthropicRequest {
  model: string;
  max_tokens: number;
  messages: AnthropicMessage[];
}

export interface AnthropicResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  content: AnthropicContent[];
  model: string;
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence';
  stop_sequence: string | null;
  usage: AnthropicUsage;
}
