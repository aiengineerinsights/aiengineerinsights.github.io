#!/usr/bin/env bash
# Re-render the newsletter banner and avatars from their HTML sources with headless Chrome.
# Usage: newsletter/assets/src/render.sh
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"
OUT="$(dirname "$SRC")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
shot() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 "$@" >/dev/null 2>&1; }

# Banner: 1200x300 at 2x = 2400x600
shot --force-device-scale-factor=2 --window-size=1200,300 --screenshot="$OUT/brief-header-banner.png" "file://$SRC/banner.html"
# Avatars: 800x800. v=H neural orb, v=I attention ring, v=J latent flow
shot --window-size=800,800 --screenshot="$OUT/avatar-neural-orb.png" "file://$SRC/avatar.html?v=H"
shot --window-size=800,800 --screenshot="$OUT/avatar-attention-ring.png" "file://$SRC/avatar.html?v=I"
shot --window-size=800,800 --screenshot="$OUT/avatar-latent-flow.png" "file://$SRC/avatar.html?v=J"
echo "Rendered into $OUT"
