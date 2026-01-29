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
export { useOpenAiGlobal } from "./useOpenAiGlobal";

// Tool-related hooks
export { useToolInput } from "./useToolInput";
export { useToolOutput } from "./useToolOutput";
export { useToolResponseMetadata } from "./useToolResponseMetadata";

// Widget state management
export { useWidgetState } from "./useWidgetState";

// UI and display hooks
export { useLocale } from "./useLocale";
export { useDisplayMode } from "./useDisplayMode";
export { useTheme } from "./useTheme";

// Action hooks
export { useCallTool } from "./useCallTool";
export { useSendFollowUpMessage } from "./useSendFollowUpMessage";
export { useUploadFile } from "./useUploadFile";
export { useGetFileDownloadUrl } from "./useGetFileDownloadUrl";
export { useRequestModal } from "./useRequestModal";
export { useOpenExternal } from "./useOpenExternal";

