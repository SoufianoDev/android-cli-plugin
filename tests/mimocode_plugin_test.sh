#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$BASH_SOURCE")/.." && pwd)"
cd "$ROOT"

failures=0
fail() {
  printf 'FAIL: %s\n' "$1"
  failures=$((failures + 1))
}

expect_file() {
  [[ -f "$1" ]] || fail "expected file $1"
}

expect_contains() {
  local path="$1"
  local pattern="$2"
  [[ -f "$path" ]] || { fail "cannot inspect missing file $path"; return; }
  grep -Fq "$pattern" "$path" || fail "expected $path to contain: $pattern"
}

expect_file "plugins/android-cli-mimocode/index.ts"
expect_file "plugins/android-cli-mimocode/package.json"
expect_file "plugins/android-cli-mimocode/LICENSE"
expect_file "plugins/android-cli-mimocode/skills/android-cli/SKILL.md"
expect_file "plugins/android-cli-mimocode/skills/android-cli/LICENSE.txt"
expect_file "tests/mimocode_plugin_runtime_test.ts"

if command -v jq >/dev/null 2>&1; then
  jq -e '.name == "android-cli-mimocode" and .type == "module" and .main == "./index.ts" and .exports["./server"] == "./index.ts"' \
    plugins/android-cli-mimocode/package.json >/dev/null || fail "invalid MiMo Code plugin package metadata"
  jq -se '.[0] as $mimo |
    ($mimo | (.version | test("^[0-9]+\\.[0-9]+\\.[0-9]+$")) and .license == "Apache-2.0" and .devDependencies["@mimo-ai/plugin"] == "0.1.16") and
    all(.[]; .version == $mimo.version)' \
    plugins/android-cli-mimocode/package.json \
    plugins/android-cli-claude/.claude-plugin/plugin.json \
    plugins/android-cli-codex/.codex-plugin/plugin.json \
    plugins/android-cli-codex-public/plugin.json \
    plugins/android-cli-opencode/package.json >/dev/null || fail "MiMo package version, license, or SDK dependency is incorrect"
else
  fail "jq is required to validate the MiMo Code plugin package manifest"
fi

expect_contains "plugins/android-cli-mimocode/index.ts" 'import { tool } from "@mimo-ai/plugin"'
expect_contains "plugins/android-cli-mimocode/index.ts" 'id: "android-cli-mimocode"'
expect_contains "plugins/android-cli-mimocode/index.ts" "android_cli_guide: tool("
expect_contains "README.md" 'mimo plugin -g'
expect_contains "README.md" 'Native MiMo Code skill'
expect_contains ".github/workflows/update-skill.yml" 'plugins/android-cli-mimocode/skills/android-cli'
expect_contains ".github/workflows/update-skill.yml" 'plugins/android-cli-mimocode/package.json'

SOURCE="plugins/android-cli-opencode/skills/android-cli"
TARGET="plugins/android-cli-mimocode/skills/android-cli"
while IFS= read -r source; do
  relative="$(basename "$source")"
  target="$TARGET/$relative"
  expect_file "$target"
  if [[ -f "$source" && -f "$target" ]] && ! cmp -s "$source" "$target"; then
    fail "MiMo bundle is out of sync with canonical file $relative (run bash scripts/sync-mimocode-skill.sh)"
  fi
done < <(find "$SOURCE" -type f | sort)

if [[ "$failures" -gt 0 ]]; then
  printf '\n%d MiMo Code plugin check(s) failed.\n' "$failures"
  exit 1
fi

printf 'MiMo Code plugin checks passed.\n'
