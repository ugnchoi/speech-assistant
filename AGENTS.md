<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

For evolving UI direction, layout shell, and visual tone, see [`docs/design.md`](docs/design.md) and keep that file updated when design changes.

## Cursor Cloud specific instructions

This is a single-service, frontend-only Next.js 16 app (App Router, Turbopack). No database, backend, Docker, or external API keys are needed.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on `localhost:3000`) |
| Lint | `npm run lint` (runs ESLint) |
| Build | `npm run build` |

### Routes

- `/` — landing / home page
- `/prototype` — main prototype page with onboarding, forms, and reflection components

### Caveats

- The project uses **Next.js 16.2.3** which has breaking changes vs earlier versions. Always check `node_modules/next/dist/docs/` before writing code.
- **Tailwind CSS v4** is used with `@tailwindcss/postcss`; there is no `tailwind.config.js` file.
- UI components use **basecn** (Base UI + shadcn-style) via `@base-ui/react`, not classic shadcn/radix.
- All state is stored in browser `localStorage` — there are no server-side data stores.
