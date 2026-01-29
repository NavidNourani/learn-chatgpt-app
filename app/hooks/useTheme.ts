"use client";

import { useOpenAiGlobal } from "./useOpenAiGlobal";

/**
 * Hook to read the theme from window.openai.theme
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useTheme() {
  return useOpenAiGlobal("theme") ?? "auto";
}

