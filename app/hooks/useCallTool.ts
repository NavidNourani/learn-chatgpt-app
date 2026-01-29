"use client";

import { useCallback } from "react";

/**
 * Hook to call MCP tools directly from the widget
 * The tool needs to be marked as able to be initiated by the component
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useCallTool() {
  return useCallback(
    async (toolName: string, args?: Record<string, unknown>) => {
      if (window.openai?.callTool) {
        await window.openai.callTool(toolName, args);
      } else {
        console.warn("window.openai.callTool is not available");
      }
    },
    [],
  );
}

