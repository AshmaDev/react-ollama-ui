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
  debugMode: boolean,
  onComplete: () => void
) => {
  const [pullingState, setPullingState] = useState<PullingState>(
    DEFAULT_PULLING_STATE
  );

  const pullNewModel = useCallback(
    async (modelName: string) => {
      setPullingState((prevState) => ({ ...prevState, model: modelName }));
      const timer = setTimeout(() => setIsPullPopupOpen(false), ERROR_TIMEOUT);

      try {
        await pullModel({ name: modelName }, (data) => {
          if (data.total > 0 && data.total === data.completed) {
            setPullingState(DEFAULT_PULLING_STATE);
            onComplete();
          } else {
            setPullingState((prevState) => ({
              ...prevState,
              status: {
                total: data.total ?? 0,
                completed: data.completed ?? 0,
              },
            }));
          }
        });
      } catch (error: unknown) {
        clearTimeout(timer);

        setPullingState((prevState) => ({
          ...prevState,
          error: String(error),
        }));

        if (debugMode) console.error("Error pulling model:", error);
      }
    },
    [setIsPullPopupOpen, onComplete, debugMode]
  );

  const clearPullingState = () => {
    setPullingState(DEFAULT_PULLING_STATE);
  };

  return { pullingState, pullNewModel, clearPullingState };
};
