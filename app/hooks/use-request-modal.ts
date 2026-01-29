"use client";

import { useCallback } from "react";

/**
 * Hook to open a host-controlled modal
 * Can pass a different UI template from the same app by providing the template URI
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useRequestModal() {
  return useCallback(
    async (template?: string) => {
      if (window.openai?.requestModal) {
        await window.openai.requestModal({ template });
      } else {
        console.warn("window.openai.requestModal is not available");
      }
    },
    [],
  );
}

