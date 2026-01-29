"use client";

/**
 * Hook to read the locale from window.openai.locale
 * The host passes locale in window.openai and mirrors it to document.documentElement.lang
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useLocale(): string {
  if (typeof window === "undefined" || !window.openai) {
    return "en-US";
  }
  return window.openai.locale ?? "en-US";
}

