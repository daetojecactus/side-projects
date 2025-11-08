interface OpenAiOutputContent {
  type: 'output_text';
  annotations: any[];
  logprobs: any[];
  text: string;
}

interface OpenAiOutputMessage {
  id: string;
  type: 'message';
  status: 'completed' | 'in_progress' | 'failed';
  content: OpenAiOutputContent[];
  role: 'assistant';
}

interface OpenAiUsage {
  input_tokens: number;
  input_tokens_details: {
    cached_tokens: number;
  };
  output_tokens: number;
  output_tokens_details: {
    reasoning_tokens: number;
  };
  total_tokens: number;
}

export interface OpenAiResponse {
  id: string;
  object: 'response';
  created_at: number;
  status: 'completed' | 'in_progress' | 'failed';
  background: boolean;
  error: any | null;
  incomplete_details: any | null;
  instructions: string | null;
  max_output_tokens: number;
  max_tool_calls: number | null;
  model: string;
  output: OpenAiOutputMessage[];
  parallel_tool_calls: boolean;
  previous_response_id: string | null;
  prompt_cache_key: string | null;
  reasoning: {
    effort: any | null;
    summary: any | null;
  };
  safety_identifier: string | null;
  service_tier: string;
  store: boolean;
  temperature: number;
  text: {
    format: {
      type: string;
    };
    verbosity: string;
  };
  tool_choice: string;
  tools: any[];
  top_logprobs: number;
  top_p: number;
  truncation: string;
  usage: OpenAiUsage;
  user: string | null;
  metadata: Record<string, any>;
}
