/**
 * OpenAI ChatGPT Apps SDK Hooks
 * 
 * A collection of hooks for developing ChatGPT widgets and apps.
 * These hooks provide access to the window.openai API for reading tool inputs/outputs,
 * managing widget state, calling tools, and interacting with the ChatGPT interface.
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 * 
 * All hooks are client-side only and designed to work with ChatGPT's widget runtime.
 */

// Type definitions
import "./types";

// Base hook for accessing window.openai globals
export { useOpenAiGlobal } from "./use-open-ai-global";

// Tool-related hooks
export { useToolInput } from "./use-tool-input";
export { useToolOutput } from "./use-tool-output";
export { useToolResponseMetadata } from "./use-tool-response-metadata";

// Widget state management
export { useWidgetState } from "./use-widget-state";
export { useWidgetProps } from "./use-widget-props";

// UI and display hooks
export { useLocale } from "./use-locale";
export { useTheme } from "./use-theme";
export { useMaxHeight } from "./use-max-height";

// Action hooks
export { useCallTool } from "./use-call-tool";
export { useSendFollowUpMessage } from "./use-send-follow-up-message";
export { useUploadFile } from "./use-upload-file";
export { useGetFileDownloadUrl } from "./use-get-file-download-url";
export { useRequestModal } from "./use-request-modal";
export { useOpenExternal } from "./use-open-external";
export { useDisplayMode } from "./use-display-mode";

