"use client";

import { useCallback } from "react";

/**
 * Hook to send conversational follow-ups
 * Inserts a message into the conversation as if the user asked it
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useSendFollowUpMessage() {
  return useCallback(
    async (prompt: string) => {
      if (window.openai?.sendFollowUpMessage) {
        await window.openai.sendFollowUpMessage({ prompt });
      } else {
        console.warn("window.openai.sendFollowUpMessage is not available");
      }
    },
    [],
  );
}

