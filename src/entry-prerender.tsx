// Build-time prerender entry. Renders a route to an HTML string through the
// same route table the client uses, so static output and the live app never
// drift. Toasters are omitted: they render nothing meaningful statically and
// touch browser APIs.
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Writable } from "node:stream";
import AppRoutes from "./routes";

export function render(path: string): Promise<string> {
  const queryClient = new QueryClient();
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const collector = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
    });
    const { pipe } = renderToPipeableStream(
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={path}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>,
      {
        // onAllReady waits for every lazy() chunk to resolve, so the full
        // page content is in the stream — not the Suspense fallback.
        onAllReady() {
          collector.on("finish", () => resolve(Buffer.concat(chunks).toString("utf8")));
          pipe(collector);
        },
        onError(err) {
          reject(err);
        },
      }
    );
  });
}
