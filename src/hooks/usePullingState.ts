import { useState, useCallback } from "react";
import { pullModel } from "@/services/api";

export interface PullingState {
  model: string;
  status: {
    completed: number;
    total: number;
  };
  error?: string;
}

const DEFAULT_PULLING_STATE = {
  model: "",
  status: { total: 0, completed: 0 },
};

const ERROR_TIMEOUT = 2000;

export const usePullingState = (
  setIsPullPopupOpen: (open: boolean) => void,
  debugMode: boolean
) => {
  const [pullingState, setPullingState] = useState<PullingState>(
    DEFAULT_PULLING_STATE
  );

  const pullNewModel = useCallback(
    async (modelName: string) => {
      setPullingState((prevState) => ({ ...prevState, model: modelName }));

      try {
        const timer = setTimeout(
          () => setIsPullPopupOpen(false),
          ERROR_TIMEOUT
        );

        const response = await pullModel({ name: modelName }, (data) => {
          setPullingState((prevState) => ({
            ...prevState,
            status: { total: data.total ?? 0, completed: data.completed ?? 0 },
          }));
        });

        if (response.error) {
          clearTimeout(timer);
          setPullingState((prevState) => ({
            ...prevState,
            error: response.error,
          }));
        }
      } catch (error) {
        if (debugMode) console.error("Error pulling model:", error);
      }
    },
    [setIsPullPopupOpen, debugMode]
  );

  const clearPullingState = () => {
    setPullingState(DEFAULT_PULLING_STATE);
  };

  return { pullingState, pullNewModel, clearPullingState };
};
