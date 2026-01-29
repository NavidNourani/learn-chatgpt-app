"use client";

import { useSyncExternalStore } from "react";

/**
 * Type definitions for window.openai globals
 */
export interface OpenAiGlobals {
  toolInput: unknown;
  toolOutput: unknown;
  toolResponseMetadata: Record<string, unknown> | null;
  widgetState: unknown;
  locale: string;
  displayMode: "inline" | "pip" | "fullscreen";
  theme: "light" | "dark" | "auto";
}

/**
 * Event type for set_globals events
 */
const SET_GLOBALS_EVENT_TYPE = "openai:set_globals" as const;

type SetGlobalsEvent = CustomEvent<{
  globals: Partial<OpenAiGlobals>;
}>;

/**
 * Base hook for accessing window.openai globals
 * Listens for host openai:set_globals events and lets React components subscribe to a single global value
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K,
): OpenAiGlobals[K] {
  return useSyncExternalStore(
    (onChange) => {
      const handleSetGlobal = (event: Event) => {
        const setGlobalsEvent = event as SetGlobalsEvent;
        const value = setGlobalsEvent.detail.globals[key];
        if (value === undefined) {
          return;
        }
        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => {
      if (typeof window === "undefined" || !window.openai) {
        return undefined as OpenAiGlobals[K];
      }
      return window.openai[key];
    },
    () => {
      // Server snapshot - return undefined during SSR
      return undefined as OpenAiGlobals[K];
    },
  );
}

