# Android CLI plugin

The official agent plugin for [Android CLI](https://developer.android.com/tools/agents/android-cli) (`android`).

It gives AI coding agents the `android-cli` skill, which teaches them to use Android CLI to create projects, run apps on devices and emulators, manage the Android SDK, look up official Android documentation, and install more [Android skills](https://github.com/android/skills).

This repository holds the plugin only. It does not contain Android CLI itself.

## Install

**Claude Code**
```
/plugin marketplace add android/android-cli-plugin
/plugin install android-cli@android-cli-plugin
```

**Codex**
```
codex plugin marketplace add android/android-cli-plugin
codex plugin add android-cli@android-cli-plugin
```

## What's in the plugin

| Path | What it is |
| --- | --- |
| `plugins/android-cli/` | The plugin |
| `plugins/android-cli/skills/android-cli/` | The `android-cli` skill |
| `plugins/android-cli/.claude-plugin/plugin.json` | Claude manifest |
| `plugins/android-cli/.codex-plugin/plugin.json` | Codex manifest |
| `.claude-plugin/marketplace.json` | Claude Code marketplace catalogue |
| `.agents/plugins/marketplace.json` | Codex marketplace catalogue |

## Android CLI documentation

- [Android CLI overview](https://developer.android.com/tools/agents/android-cli)
- [Download & install](https://developer.android.com/tools/agents/android-cli/download)
- [Command reference](https://developer.android.com/tools/agents/android-cli/commands)

## License

Copyright 2026 Google LLC. Licensed under the [Apache 2.0 License](LICENSE).
