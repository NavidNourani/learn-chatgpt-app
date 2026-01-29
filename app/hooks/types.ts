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

// currently copied from types.ts in chatgpt/web-sandbox.
// Will eventually use a public package.
type API = {
  callTool: CallTool;
  sendFollowUpMessage: (args: { prompt: string }) => Promise<void>;
  openExternal(payload: { href: string }): void;

  // Layout controls
  requestDisplayMode: RequestDisplayMode;
  requestModal: (args: { title?: string; params?: UnknownObject }) => Promise<unknown>;
  requestClose: () => Promise<void>;
};

export type OpenAiGlobals<
  ToolInput = UnknownObject,
  ToolOutput = UnknownObject,
  ToolResponseMetadata = UnknownObject,
  WidgetState = UnknownObject
> = {
  // visuals
  theme: Theme;

  userAgent: UserAgent;
  locale: string;

  // layout
  maxHeight: number;
  displayMode: DisplayMode;
  safeArea: SafeArea;

  // state
  toolInput: ToolInput;
  toolOutput: ToolOutput | null;
  toolResponseMetadata: ToolResponseMetadata | null;
  widgetState: WidgetState | null;

  // methods
  setWidgetState: (state: Record<string, unknown>) => void;
  callTool: (toolName: string, args?: Record<string, unknown>) => Promise<void>;
  sendFollowUpMessage: (options: { prompt: string }) => Promise<void>;
  uploadFile: (file: File) => Promise<{ fileId: string }>;
  getFileDownloadUrl: (options: { fileId: string }) => Promise<{ downloadUrl: string }>;
  requestDisplayMode: (options: { mode: "inline" | "pip" | "fullscreen" }) => Promise<void>;
  requestModal: (options: { template?: string }) => Promise<void>;
  openExternal: (options: { url: string }) => Promise<void>;
};


export type UnknownObject = Record<string, unknown>;

export type Theme = "light" | "dark";

export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SafeArea = {
  insets: SafeAreaInsets;
};

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export type UserAgent = {
  device: { type: DeviceType };
  capabilities: {
    hover: boolean;
    touch: boolean;
  };
};

/** Display mode */
export type DisplayMode = "pip" | "inline" | "fullscreen";
export type RequestDisplayMode = (args: { mode: DisplayMode }) => Promise<{
  /**
   * The granted display mode. The host may reject the request.
   * For mobile, PiP is always coerced to fullscreen.
   */
  mode: DisplayMode;
}>;

export type CallToolResponse = {
  result: string;
};

/** Calling APIs */
export type CallTool = (
  name: string,
  args: Record<string, unknown>
) => Promise<CallToolResponse>;

/** Extra events */
export const SET_GLOBALS_EVENT_TYPE = "openai:set_globals";
export class SetGlobalsEvent extends CustomEvent<{
  globals: Partial<OpenAiGlobals>;
}> {
  readonly type = SET_GLOBALS_EVENT_TYPE;
}

/**
 * Global oai object injected by the web sandbox for communicating with chatgpt host page.
 */
declare global {
  interface Window {
    openai: API & OpenAiGlobals;
  }

  interface WindowEventMap {
    [SET_GLOBALS_EVENT_TYPE]: SetGlobalsEvent;
  }
}
