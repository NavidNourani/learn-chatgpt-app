"use client";

import { useOpenAiGlobal } from "./use-open-ai-global";

/**
 * Hook to read the tool output from window.openai.toolOutput
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useToolOutput() {
  return useOpenAiGlobal("toolOutput");
}

