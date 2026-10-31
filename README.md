# Android CLI plugin

Build Android apps more efficiently with Android CLI.

Android CLI is a command-line interface for building Android apps more efficiently. Using Android CLI together with any AI tool of your choice, you can create Android projects, run apps, manage the SDK and virtual devices, inspect live device screens and UI hierarchies, connect to Android Studio, test with Journeys, install Android skills, and search Android documentation.

This plugin adds the `android-cli` skill, which teaches your agent to use [Android CLI](https://developer.android.com/tools/agents/android-cli).

This repository holds the plugin only. It does not contain Android CLI itself.

## Install

**Antigravity (from Antigravity CLI)**
```
/plugin install android-cli-plugin@antigravity-plugins-official
```

**Antigravity (from terminal)**
```
antigravity plugin install android-cli-plugin@antigravity-plugins-official
```

**Claude (from Claude Code)**
```
/plugin marketplace add SoufianoDev/android-cli-plugin
/plugin install android-cli@android-cli-plugin
```

**Claude (from terminal)**
```
claude plugin marketplace add SoufianoDev/android-cli-plugin
claude plugin install android-cli@android-cli-plugin
```

**Codex (from terminal)**
```
codex plugin marketplace add SoufianoDev/android-cli-plugin
codex plugin add android-cli@android-cli-plugin
```

**OpenCode V2 (from terminal, TUI and Desktop)**
```
opencode plugin add 'github:SoufianoDev/android-cli-plugin#main::path:plugins/android-cli-opencode'
```

Requires OpenCode V2; update with `opencode upgrade`, or run `opencode upgrade --major` to migrate from V1.

The install is global, so the same command covers the OpenCode Desktop app: the skill is registered server-side and is available in every session, and the plugin is listed under **Settings > Extensions > Plugins**.

### Xiaomi MiMo Code

The repository includes an optional TypeScript server plugin in `plugins/android-cli-mimocode/`. It uses MiMo Code's `@mimo-ai/plugin` SDK (not OpenCode's SDK) and exposes an `android_cli_guide` tool that loads the official Android CLI skill on demand, either in full or by focused section. See MiMo Code's official [Agent Skills](https://mimo.xiaomi.com/mimocode/skills) and [Custom Tools](https://mimo.xiaomi.com/mimocode/custom-tools) documentation. The plugin does not install the `android` executable; install Android CLI separately using the [official instructions](https://developer.android.com/tools/agents/android-cli).

#### CLI/TUI plugin

The plugin is not published as an npm package. Clone this repository to a stable local path and register the plugin with MiMo Code:

```bash
git clone https://github.com/SoufianoDev/android-cli-plugin.git "$HOME/.local/share/android-cli-plugin"
mimo plugin -g "$HOME/.local/share/android-cli-plugin/plugins/android-cli-mimocode"
```

Keep the checkout at that path after installation. This external-checkout plugin targets MiMo Code's Bun-based CLI/TUI runtime; the MiMo Desktop Node runtime does not load this external-checkout plugin.

#### Native MiMo Code skill (recommended for Desktop)

MiMo Code natively discovers `SKILL.md` files in its global config directory's `skills/` folder and supported project directories such as `.agents/skills/`. This option does not require a TypeScript plugin.

If you have not cloned the repository already, run the `git clone` command above. Then install the skill globally:

```bash
if [ -n "${MIMOCODE_HOME:-}" ]; then
  mimocode_config_dir="$MIMOCODE_HOME/config"
else
  mimocode_config_dir="${XDG_CONFIG_HOME:-$HOME/.config}/mimocode"
fi
skill_dir="${MIMO_SKILL_DIR:-$mimocode_config_dir/skills/android-cli}"
mkdir -p "$skill_dir"
cp -R "$HOME/.local/share/android-cli-plugin/plugins/android-cli-mimocode/skills/android-cli/." "$skill_dir/"
```

Run these commands with the same environment as MiMo Code. As described in its [configuration documentation](https://mimo.xiaomi.com/mimocode/config-overrides), `MIMOCODE_HOME` takes precedence over `XDG_CONFIG_HOME`; with neither set, the destination is `~/.config/mimocode/skills/android-cli/`. If the shell cannot determine the directory used by your MiMo Code installation (for example, Desktop uses a different environment), set `MIMO_SKILL_DIR` to the absolute destination, including `skills/android-cli`, before running the commands: `export MIMO_SKILL_DIR="/absolute/path/to/mimocode/config/skills/android-cli"`.

For one project, run these commands from the project root instead:

```bash
mkdir -p .agents/skills/android-cli
cp -R "$HOME/.local/share/android-cli-plugin/plugins/android-cli-mimocode/skills/android-cli/." .agents/skills/android-cli/
```

Keep both `SKILL.md` and `LICENSE.txt` with the skill. MiMo Code reads the `name` and `description` frontmatter fields and loads the skill when it is relevant.

## What's in the plugin

| Path | What it is |
| --- | --- |
| `plugins/android-cli-claude/` | The plugin for Claude |
| `plugins/android-cli-codex/` | The plugin for Codex |
| `plugins/android-cli-opencode/` | The plugin for OpenCode |
| `plugins/android-cli-mimocode/` | Optional MiMo Code TypeScript plugin and bundled Android CLI skill |
| `scripts/sync-mimocode-skill.sh` | Copies the canonical Android CLI skill into the MiMo Code package |
| `plugins/*/skills/android-cli/` | The `android-cli` skill bundled with each agent package; CI checks the MiMo copy against the canonical OpenCode copy |
| `.claude-plugin/marketplace.json` | Claude Code marketplace catalogue |
| `.agents/plugins/marketplace.json` | Codex marketplace catalogue |
| `plugins/android-cli-codex-public/` | Package for OpenAI's public Plugins Directory |

## Android CLI documentation

- [Android CLI overview](https://developer.android.com/tools/agents/android-cli)
- [Download & install](https://developer.android.com/tools/agents/android-cli/download)
- [Command reference](https://developer.android.com/tools/agents/android-cli/commands)

## License

Copyright 2026 Google LLC. Licensed under the [Apache 2.0 License](LICENSE).
