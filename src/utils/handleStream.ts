type OnDataReceived<T> = (data: T) => void;
type OnComplete = () => void;
type OnError = (error: Error) => void;

export const handleStream = async <T>(
  res: Response,
  onDataReceived: OnDataReceived<T>,
  onComplete?: OnComplete,
  onError?: OnError
): Promise<void> => {
  try {
    const reader = res.body?.getReader();

    if (!reader) {
      throw new Error("No reader available in the response.");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const boundary = buffer.lastIndexOf("\n");
      if (boundary !== -1) {
        const completeChunks = buffer.slice(0, boundary).split("\n");
        buffer = buffer.slice(boundary + 1);

        for (const chunk of completeChunks) {
          if (chunk.trim()) {
            const parsedChunk: T = JSON.parse(chunk);
            onDataReceived(parsedChunk);
          }
        }
      }
    }

    if (buffer.trim()) {
      const parsedChunk: T = JSON.parse(buffer);
      onDataReceived(parsedChunk);
    }

    if (onComplete) onComplete();
  } catch (error) {
    if (onError) onError(error as Error);
  }
};
