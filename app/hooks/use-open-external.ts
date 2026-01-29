"use client";

import { useCallback } from "react";

/**
 * Hook to open external URLs
 * If the destination is in redirect_domains, ChatGPT will skip the safe-link modal
 * and append a redirectUrl query parameter for routing back into ChatGPT
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useOpenExternal() {
  return useCallback(
    async (url: string) => {
      if (window.openai?.openExternal) {
        await window.openai.openExternal({ url });
      } else {
        console.warn("window.openai.openExternal is not available");
        // Fallback to window.open
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [],
  );
}

