import { useState, useEffect, useCallback } from "react";
import { WebContainer } from "@webcontainer/api";
import type { TemplateFolder } from "@/modules/playground/lib/path-to-json";

// ---- GLOBAL SINGLETON INSTANCE ----
let globalContainer: WebContainer | null = null;
let isBooting = false;

interface UseWebContainerProps {
  templateData: TemplateFolder;
}

interface UseWebContaierReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destroy: () => void;
}

export const useWebContainer = ({
  templateData,
}: UseWebContainerProps): UseWebContaierReturn => {
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [instance, setInstance] = useState<WebContainer | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeWebContainer() {
      try {
        if (globalContainer) {
          // already booted — reuse it
          setInstance(globalContainer);
          setIsLoading(false);
          return;
        }

        if (isBooting) {
          // wait until boot completes
          const waitForBoot = () =>
            new Promise<WebContainer>((resolve) => {
              const interval = setInterval(() => {
                if (globalContainer) {
                  clearInterval(interval);
                  resolve(globalContainer);
                }
              }, 100);
            });

          const container = await waitForBoot();
          if (mounted) {
            setInstance(container);
            setIsLoading(false);
          }
          return;
        }

        // First time boot
        isBooting = true;
        const container = await WebContainer.boot();

        globalContainer = container;
        isBooting = false;

        if (mounted) {
          setInstance(container);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to initialize WebContainer:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to boot WebContainer");
          setIsLoading(false);
        }
      }
    }

    initializeWebContainer();

    return () => {
      mounted = false;
    };
  }, [templateData]);

  const writeFileSync = useCallback(
    async (path: string, content: string): Promise<void> => {
      if (!instance) throw new Error("WebContainer instance is not available");

      try {
        const pathParts = path.split("/");
        const folderPath = pathParts.slice(0, -1).join("/");

        if (folderPath) {
          await instance.fs.mkdir(folderPath, { recursive: true });
        }

        await instance.fs.writeFile(path, content);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to write file";
        console.error(`Failed to write file at ${path}:`, err);
        throw new Error(`Failed to write file at ${path}: ${errorMessage}`);
      }
    },
    [instance]
  );

  const destroy = useCallback(() => {
    if (globalContainer) {
      globalContainer.teardown();
      globalContainer = null;
    }
    setInstance(null);
    setServerUrl(null);
  }, []);

  return { serverUrl, isLoading, error, instance, writeFileSync, destroy };
};
