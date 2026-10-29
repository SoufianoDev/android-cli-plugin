import plugin from "../plugins/android-cli-mimocode/index.ts"

const expectedHeadings = {
  overview: "This skill provides instructions for using the ",
  installation: "## Installation",
  "sdk-management": "## SDK management",
  "project-creation": "## Project creation",
  "device-interaction": "## Interacting with Android devices",
  "journey-testing": "### Running journey tests",
  "documentation-search": "## Doc searching",
  "running-apps": "## Running APKs",
  emulators: "## Managing emulators",
  screenshots: "## Capturing screenshots",
  skills: "## Managing skills",
  updates: "## Updating the CLI",
  help: "android help",
} as const

const hooks = await plugin.server({} as never)
const guideTool = hooks.tool?.android_cli_guide

if (!guideTool) {
  throw new Error("MiMo Code plugin did not register android_cli_guide")
}

for (const [section, expected] of Object.entries(expectedHeadings)) {
  const result = await guideTool.execute({ section } as never, {} as never)
  const expectedPrefix = "Android CLI guide section: " + section +
    "\nSource: skills/android-cli/SKILL.md\n\n"

  if (typeof result !== "string" || !result.startsWith(expectedPrefix)) {
    throw new Error('Unexpected result for section "' + section + '"')
  }

  const body = result.slice(expectedPrefix.length)
  if (!body.includes(expected) || body.trim().length < 20) {
    throw new Error('Missing expected content for section "' + section + '"')
  }
}

console.log("MiMo Code runtime smoke test passed for all 13 Android CLI guide sections.")
