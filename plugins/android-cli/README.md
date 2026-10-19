# Android CLI plugin

Google's agent plugin for [Android CLI](https://developer.android.com/tools/agents/android-cli) (`android`).

It adds the `android-cli` skill, which teaches the agent to use Android CLI to create Android projects, run apps on devices and emulators, manage Android SDK components, take screenshots and inspect the UI, look up official Android documentation, and install more [Android skills](https://github.com/android/skills).

## Install

**Claude Code**
```
/plugin marketplace add android/android-cli-plugin
/plugin install android-cli@android-cli-plugin
```

**Codex**
```
codex plugin marketplace add android/android-cli-plugin
```
Then open the Codex desktop app, go to the Plugins Directory, choose the **Android CLI plugin** marketplace and install **android-cli**.

## What the plugin runs

The plugin contains one skill and no hooks, scripts or MCP servers. When the skill is used, the agent runs `android` commands on your machine, and you approve them as usual. If Android CLI isn't installed, the skill tells the agent to download and run Google's official installer from `dl.google.com`, which you also approve. The plugin itself sends no data anywhere.

## More information

- [Android CLI overview](https://developer.android.com/tools/agents/android-cli)
- [Command reference](https://developer.android.com/tools/agents/android-cli/commands)
- [Source repository](https://github.com/android/android-cli-plugin)

## License

Apache 2.0. See [LICENSE.txt](skills/android-cli/LICENSE.txt).
