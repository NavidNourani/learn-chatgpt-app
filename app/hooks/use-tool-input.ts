"use client";

import { useOpenAiGlobal } from "./use-open-ai-global";

/**
 * Hook to read the tool input from window.openai.toolInput
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useToolInput() {
  return useOpenAiGlobal("toolInput");
}

