"use client";

import { useCallback, useEffect, useState } from "react";
import { useOpenAiGlobal } from "./useOpenAiGlobal";

type SetStateAction<T> = T | ((prevState: T) => T);
type WidgetState = Record<string, unknown>;

/**
 * Hook to manage widget state that persists across sessions
 * Widget state is scoped to the specific widget instance and is sent to the model
 * 
 * @param defaultState - Default state value or function that returns default state
 * @returns A tuple containing the current state and a setter function
 * 
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useWidgetState<T extends WidgetState>(
  defaultState: T | (() => T),
): readonly [T, (state: SetStateAction<T>) => void];
export function useWidgetState<T extends WidgetState>(
  defaultState?: T | (() => T | null) | null,
): readonly [T | null, (state: SetStateAction<T | null>) => void];
export function useWidgetState<T extends WidgetState>(
  defaultState?: T | (() => T | null) | null,
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const widgetStateFromWindow = useOpenAiGlobal("widgetState") as T;

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow;
    }

    return typeof defaultState === "function"
      ? defaultState()
      : (defaultState ?? null);
  });

  useEffect(() => {
    _setWidgetState(widgetStateFromWindow);
  }, [widgetStateFromWindow]);

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state;

        if (newState != null && window.openai?.setWidgetState) {
          window.openai.setWidgetState(newState);
        }

        return newState;
      });
    },
    [],
  );

  return [widgetState, setWidgetState] as const;
}

