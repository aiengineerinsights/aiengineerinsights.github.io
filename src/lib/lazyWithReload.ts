import { lazy, type ComponentType } from "react";

// Each deploy changes the hashed chunk filenames, so a tab opened before the
// deploy still references chunks that no longer exist ("Failed to fetch
// dynamically imported module" / Safari: "Importing a module script failed").
// On a failed chunk load, reload once to pick up the new index.html. The
// sessionStorage timestamp prevents a reload loop if the chunk is truly broken.
const RELOAD_KEY = "aei-chunk-reload-at";
const RELOAD_WINDOW_MS = 10_000;

export function lazyWithReload<T extends ComponentType<unknown>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (typeof window === "undefined") throw error;
      let last = 0;
      try {
        last = Number(window.sessionStorage.getItem(RELOAD_KEY)) || 0;
      } catch {
        // storage blocked — fall through and rethrow below
      }
      if (Date.now() - last > RELOAD_WINDOW_MS) {
        try {
          window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
          window.location.reload();
          // Keep Suspense showing its fallback until the reload happens.
          return await new Promise<never>(() => {});
        } catch {
          // storage blocked — can't guard the loop, so don't reload
        }
      }
      throw error;
    }
  });
}
