import { readFile } from "node:fs/promises"
import path from "node:path"
import { Plugin, Skill } from "@opencode/plugin"

export default Plugin.define({
  id: "android-cli",
  async setup(ctx) {
    const file = path.join(import.meta.dirname, "skills", "android-cli", "SKILL.md")
    const raw = (await readFile(file, "utf8")).replace(/\r\n/g, "\n")
    const end = raw.startsWith("---\n") ? raw.indexOf("\n---\n", 4) : -1
    const front = end < 0 ? "" : raw.slice(4, end)
    const body = end < 0 ? raw : raw.slice(end + "\n---\n".length)
    // shortcut: parses plain (unquoted, non-block) frontmatter scalars only; switch to a YAML parser if SKILL.md ever quotes or blocks them.
    const description = front
      .match(/^description:[ \t]*(.*(?:\n[ \t]+\S.*)*)/m)?.[1]
      .replace(/[ \t]*\n[ \t]*/g, " ")
      .trim()
    if (!description) throw new Error("android-cli: SKILL.md frontmatter has no description; the skill would never be advertised")
    const name = front.match(/^name:[ \t]*(.+)$/m)?.[1].trim().replace(/^["']|["']$/g, "") ?? "android-cli"
    await ctx.skill.transform((editor) => {
      editor.add({
        id: Skill.ID.make("android-cli"),
        name: Skill.Name.make(name),
        description,
        path: Skill.Info.fields.path.make(file),
        content: body,
      })
    })
  },
})
