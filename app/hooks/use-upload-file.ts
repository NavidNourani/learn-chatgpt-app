"use client";

import { useCallback } from "react";

/**
 * Hook to upload files from the widget
 * Currently supports image/png, image/jpeg, and image/webp
 * Returns a fileId that can be used in tool calls
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useUploadFile() {
  return useCallback(
    async (file: File): Promise<string | null> => {
      if (!window.openai?.uploadFile) {
        console.warn("window.openai.uploadFile is not available");
        return null;
      }

      try {
        const { fileId } = await window.openai.uploadFile(file);
        return fileId;
      } catch (error) {
        console.error("Failed to upload file:", error);
        return null;
      }
    },
    [],
  );
}

