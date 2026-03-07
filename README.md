# youngxguo.github.io

Personal site rebuilt from Jekyll to **Vite + React + TypeScript**.

## Stack

- Vite 7
- React 19
- TypeScript
- ESLint 9 (flat config)
- Prettier
- Vitest + Testing Library

## Development

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Build output is generated in `dist/`, and `dist/404.html` is copied from `index.html` to support GitHub Pages SPA routing.
