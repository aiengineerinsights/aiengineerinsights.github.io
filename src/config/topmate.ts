// The Topmate (paid 1:1) booking link, tagged so bookings can be traced back
// to this site in Topmate's analytics. `placement` says where on the site the
// link sits; `content` is optional detail such as the article slug.
const TOPMATE_BASE = "https://topmate.io/poorna_prudhvi_gurram";

export const topmateUrl = (placement: string, content?: string): string => {
  const params = new URLSearchParams({
    utm_source: "aiengineerinsights",
    utm_medium: "blog",
    utm_campaign: placement,
  });
  if (content) params.set("utm_content", content);
  return `${TOPMATE_BASE}?${params.toString()}`;
};
