"use client";

import { useOpenAiGlobal } from "./useOpenAiGlobal";
import { useCallback } from "react";

/**
 * Hook to read and request display mode changes
 * Display modes: inline, pip (picture-in-picture), or fullscreen
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useDisplayMode() {
  const displayMode = useOpenAiGlobal("displayMode") ?? "inline";

  const requestDisplayMode = useCallback(
    async (mode: "inline" | "pip" | "fullscreen") => {
      if (window.openai?.requestDisplayMode) {
        await window.openai.requestDisplayMode({ mode });
      }
    },
    [],
  );

  return {
    displayMode,
    requestDisplayMode,
  };
}

