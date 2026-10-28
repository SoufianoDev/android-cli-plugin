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
agy plugin install android-cli-plugin@antigravity-plugins-official
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

## What's in the plugin

| Path | What it is |
| --- | --- |
| `plugins/android-cli-claude/` | The plugin for Claude |
| `plugins/android-cli-codex/` | The plugin for Codex |
| `plugins/android-cli-opencode/` | The plugin for OpenCode |
| `plugins/*/skills/android-cli/` | The `android-cli` skill (same in all four) |
| `.claude-plugin/marketplace.json` | Claude Code marketplace catalogue |
| `.agents/plugins/marketplace.json` | Codex marketplace catalogue |
| `plugins/android-cli-codex-public/` | Package for OpenAI's public Plugins Directory |

## Android CLI documentation

- [Android CLI overview](https://developer.android.com/tools/agents/android-cli)
- [Download & install](https://developer.android.com/tools/agents/android-cli/download)
- [Command reference](https://developer.android.com/tools/agents/android-cli/commands)

## License

Copyright 2026 Google LLC. Licensed under the [Apache 2.0 License](LICENSE).
