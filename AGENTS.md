# AGENTS

Personal site built with React 19 + TypeScript (Vite, Vitest, `pnpm@9.15.2`).

## Rules

- Prefer small, reviewable changes; one concern per commit.
- Keep UI edits minimal and intentional; avoid adding framework churn.
- Use function components with explicit `Props` types.
- Keep styles and component logic easy to scan; split files when complexity grows.
- Preserve clean static output for GitHub Pages (`dist/index.html` and `dist/404.html` are build artifacts).

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Done gate: `pnpm lint`, `pnpm test`, `pnpm build`
- Common: `pnpm typecheck`, `pnpm format`, `pnpm format:check`, `pnpm lint:fix`, `pnpm test:watch`
- Enable git hooks once per clone: `git config core.hooksPath .githooks`

## GitHub / Commits

- Use native `gh` CLI when working with GitHub issues/PRs.
- Commit format: `<emoji> <type>(<scope>): <summary>`.
- Types: `✨ feat`, `🐛 fix`, `🧹 chore`, `♻️ refactor`, `📝 docs`, `✅ test`, `🎨 style`, `⚡ perf`, `♿ a11y`, `👷 ci`, `🔧 build`.
- Subject rules: imperative mood, specific summary, target <72 chars.
- Body rules: 1-3 short lines that explain why/impact, not file-by-file diffs.
- If linked to work items: use `Closes #123` / `Fixes #123` for completed work, `Refs #123` otherwise.
- Prefer atomic commits; separate refactors from behavior changes.
- Verify message quality before push: `git log --format=medium -n 1`.

Examples:

- `✨ feat(home): add yxgui-powered hero section`
- `🐛 fix(nav): correct external link target`
- `🧹 chore(deps): bump vitest to latest patch`

## Notes

- Keep workflow/agent instructions in `AGENTS.md` (not scattered across docs).
- Do not hand-edit `dist/`; regenerate via build.
- Update tests when behavior changes.
