/**
 * Type definitions for window.openai API
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */

export interface OpenAiWindow {
  openai?: {
    // Globals
    toolInput: unknown;
    toolOutput: unknown;
    toolResponseMetadata: Record<string, unknown> | null;
    widgetState: unknown;
    locale: string;
    displayMode: "inline" | "pip" | "fullscreen";
    theme: "light" | "dark" | "auto";

    // Methods
    setWidgetState: (state: Record<string, unknown>) => void;
    callTool: (toolName: string, args?: Record<string, unknown>) => Promise<void>;
    sendFollowUpMessage: (options: { prompt: string }) => Promise<void>;
    uploadFile: (file: File) => Promise<{ fileId: string }>;
    getFileDownloadUrl: (options: { fileId: string }) => Promise<{ downloadUrl: string }>;
    requestDisplayMode: (options: { mode: "inline" | "pip" | "fullscreen" }) => Promise<void>;
    requestModal: (options: { template?: string }) => Promise<void>;
    openExternal: (options: { url: string }) => Promise<void>;
  };
}

declare global {
  interface Window extends OpenAiWindow {}
}

