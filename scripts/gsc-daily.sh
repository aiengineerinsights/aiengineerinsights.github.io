#!/bin/bash
# Daily Search Console pull for the impressions goal. Prints daily totals for the
# last 28 days plus top queries/pages, using the Search Analytics API.
#
# One-time auth (opens a browser; sign in with the account that owns the property):
#   gcloud auth application-default login \
#     --scopes=https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
#
# Usage: scripts/gsc-daily.sh [site]   (default: sc-domain:aiengineerinsights.com,
#        falls back to the URL-prefix property https://aiengineerinsights.com/)
set -euo pipefail
TOKEN=$(gcloud auth application-default print-access-token)
END=$(date -v-2d +%F)
START=$(date -v-29d +%F)

query() { # $1=site  $2=dimensions JSON array  $3=rowLimit
  local site
  site=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=''))" "$1")
  curl -sf -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    "https://www.googleapis.com/webmasters/v3/sites/$site/searchAnalytics/query" \
    -d "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":$2,\"rowLimit\":$3}"
}

SITE=${1:-sc-domain:aiengineerinsights.com}
if ! query "$SITE" '["date"]' 1 >/dev/null 2>&1; then SITE="https://aiengineerinsights.com/"; fi

echo "# GSC $SITE  $START..$END"
query "$SITE" '["date"]' 40 | python3 -c '
import json,sys
rows=json.load(sys.stdin).get("rows",[])
for r in rows: print(r["keys"][0], int(r["impressions"]), "impr", int(r["clicks"]), "clicks", round(r["position"],1), "pos")
if rows:
    last7=rows[-7:]; print("avg/day last7:", round(sum(r["impressions"] for r in last7)/len(last7)), "| avg/day 28d:", round(sum(r["impressions"] for r in rows)/len(rows)))'
echo "## top queries (pos 4-20 = striking distance)"
query "$SITE" '["query","page"]' 200 | python3 -c '
import json,sys
rows=sorted(json.load(sys.stdin).get("rows",[]),key=lambda r:-r["impressions"])
for r in rows[:40]:
    q,p=r["keys"]; flag="  <-- striking" if 4<=r["position"]<=20 else ""
    imp,clk,pos=int(r["impressions"]),int(r["clicks"]),r["position"]
    path=p.replace("https://aiengineerinsights.com","")
    print(f"{imp:>6} impr {clk:>3} clk pos {pos:5.1f}  {q[:50]:50} {path}{flag}")'
