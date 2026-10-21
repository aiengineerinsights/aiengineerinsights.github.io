// Drop-in for react-router's Link that always emits trailing-slash hrefs.
// GitHub Pages serves /foo/ and 301s /foo -> /foo/, so a slash-less href in
// the hydrated DOM costs every JS-rendering crawler (Googlebot, SEO tools) a
// redirect hop. Route matching ignores the slash, so navigation is unchanged.
import { forwardRef } from "react";
import { Link as RouterLink, type LinkProps } from "react-router-dom";

export function withTrailingSlash(to: string): string {
  const m = to.match(/^(\/[^?#]*?)([?#].*)?$/);
  if (!m) return to;
  const [, path, rest = ""] = m;
  if (path === "/" || path.endsWith("/") || /\.[a-z0-9]+$/i.test(path)) return to;
  return `${path}/${rest}`;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => (
  <RouterLink ref={ref} to={typeof to === "string" ? withTrailingSlash(to) : to} {...props} />
));
Link.displayName = "Link";
