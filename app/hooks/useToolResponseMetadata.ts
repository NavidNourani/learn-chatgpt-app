"use client";

import { useOpenAiGlobal } from "./useOpenAiGlobal";

/**
 * Hook to read the tool response metadata from window.openai.toolResponseMetadata
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useToolResponseMetadata() {
  return useOpenAiGlobal("toolResponseMetadata");
}

