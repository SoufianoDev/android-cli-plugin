import { readFile } from "node:fs/promises"
import path from "node:path"
import { tool } from "@mimo-ai/plugin"
import type { PluginModule } from "@mimo-ai/plugin"

const SECTIONS = {
  overview: null,
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

type GuideSection = keyof typeof SECTIONS

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
}

function extractSection(markdown: string, heading: string): string {
  const lines = markdown.split(/\r?\n/)
  const start = lines.findIndex((line) =>
    line.trim() === heading || (heading === "android help" && line.includes(heading)),
  )
  if (start < 0) {
    throw new Error("android-cli: expected heading not found in bundled SKILL.md: " + heading)
  }

  const level = heading.match(/^#+/)?.[0].length ?? 2
  let end = lines.length
  for (let index = start + 1; index < lines.length; index += 1) {
    const nextHeading = lines[index].match(/^(#{1,6})\s+/)
    if (nextHeading && nextHeading[1].length <= level) {
      end = index
      break
    }
  }

  const section = lines.slice(start, end).join("\n").trim()
  if (!section) throw new Error("android-cli: bundled section is empty: " + heading)
  return section
}

const plugin: PluginModule = {
  id: "android-cli-mimocode",
  async server() {
    return {
      tool: {
        android_cli_guide: tool({
          description:
            "Load the official Android CLI skill instructions before using the Android CLI command for Android development, devices, emulators, SDK management, UI inspection, Journeys, Android documentation, or skills. Choose a focused section for less context, or overview for the complete skill. This tool provides guidance; it does not install or execute Android CLI.",
          args: {
            section: tool.schema
              .enum([
                "overview",
                "installation",
                "sdk-management",
                "project-creation",
                "device-interaction",
                "journey-testing",
                "documentation-search",
                "running-apps",
                "emulators",
                "screenshots",
                "skills",
                "updates",
                "help",
              ])
              .describe("Which part of the Android CLI skill to load"),
          },
          async execute({ section }) {
            const file = path.join(import.meta.dirname, "skills", "android-cli", "SKILL.md")
            const markdown = stripFrontmatter(await readFile(file, "utf8"))
            const heading = SECTIONS[section as GuideSection]
            const content = heading ? extractSection(markdown, heading) : markdown.trim()
            if (content.length < 20) {
              throw new Error("android-cli: bundled skill content is missing for section: " + section)
            }
            return "Android CLI guide section: " + section +
              "\nSource: skills/android-cli/SKILL.md\n\n" + content
          },
        }),
      },
    }
  },
}

export default plugin
