"use client";

import { useCallback } from "react";

/**
 * Hook to get a temporary download URL for files
 * Files can be uploaded by the widget or passed to your tool via file params
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useGetFileDownloadUrl() {
  return useCallback(
    async (fileId: string): Promise<string | null> => {
      if (!window.openai?.getFileDownloadUrl) {
        console.warn("window.openai.getFileDownloadUrl is not available");
        return null;
      }

      try {
        const { downloadUrl } = await window.openai.getFileDownloadUrl({
          fileId,
        });
        return downloadUrl;
      } catch (error) {
        console.error("Failed to get file download URL:", error);
        return null;
      }
    },
    [],
  );
}

