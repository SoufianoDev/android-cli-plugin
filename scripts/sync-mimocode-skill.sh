#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$BASH_SOURCE")/.." && pwd)"
SOURCE="$ROOT/plugins/android-cli-opencode/skills/android-cli"
TARGET="$ROOT/plugins/android-cli-mimocode/skills/android-cli"

if [[ ! -f "$SOURCE/SKILL.md" || ! -f "$SOURCE/LICENSE.txt" ]]; then
  printf 'Canonical Android CLI skill files are missing in %s\n' "$SOURCE" >&2
  exit 1
fi

rm -rf "$TARGET"
mkdir -p "$TARGET"
cp -R "$SOURCE/." "$TARGET/"

printf 'Synced Android CLI skill into the MiMo Code package.\n'
