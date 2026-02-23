# opencode-evals

Standalone agent eval framework — 27 coding evals for testing AI coding agents. Runs locally, no Docker required. Supports both [opencode](https://opencode.ai) and [Claude Code](https://claude.ai/claude-code).

## Usage

```bash
# Single eval with opencode
./run-eval.sh evals/01-fix-bug-off-by-one

# Single eval with Claude Code
./run-eval-claude.sh evals/01-fix-bug-off-by-one --model sonnet

# All 27 evals with opencode
./run-all-evals.sh

# All 27 evals with Claude Code
./run-all-evals-claude.sh --model opus

# Run both agents in parallel
./run-both.sh
```

Results are saved as JSON to `results/`.

## How It Works

1. Copies the eval to a temp directory
2. Hides `EVAL.ts` so the agent cannot see the grading criteria
3. Runs `npm install`
4. Sends `PROMPT.md` to the agent (`opencode run` or `claude -p`)
5. Optionally runs `npm run build`
6. Restores `EVAL.ts` and grades with `npx vitest run`
7. Reports PASS/FAIL and saves JSON result

## Evals

### General Coding (01–07)

| # | Eval | Description |
|---|------|-------------|
| 01 | **fix-bug-off-by-one** | Three array utility functions (`paginate`, `findLastIndex`, `chunk`) contain intentional off-by-one bugs. The agent must identify and fix all bugs so the functions produce correct results. Tests verify correct output for various inputs. |
| 02 | **nextjs-api-route** | Create a Next.js App Router API route implementing a full CRUD TODO API with GET, POST, PUT, and DELETE handlers. Tests check that the route file exists, exports all four HTTP method handlers, uses proper response objects, and parses request bodies. |
| 03 | **typescript-type-safety** | Five functions have type errors preventing compilation: missing parameter types, missing return fields, untyped generics, unhandled discriminated unions, and nullable access. The agent must fix all errors without using `any` or `as` assertions. Tests verify the code compiles with `tsc --strict`. |
| 04 | **react-component-creation** | Build a `SearchFilter` React client component that accepts a list of strings, renders a text input, filters items case-insensitively in real-time, and shows a "no results" message. Tests check for `use client`, `useState`, input/list elements, filtering logic, and that the page imports the component. |
| 05 | **data-transformation** | Implement three data utility functions from stubs: `processRecord` (convert raw records with grade assignment), `groupByGrade` (group records by letter grade), and `flatten` (flatten nested objects to dot-notation keys). Tests run the functions directly and verify return values. |
| 06 | **error-handling** | Three functions perform unsafe operations (JSON parsing, division, nested property access) with no error handling. The agent must wrap each in a `Result<T>` type pattern with proper try-catch, null checks, and empty array guards. Tests verify the code contains error handling patterns. |
| 07 | **write-tests** | Given four implemented utility functions (`factorial`, `fibonacci`, `isPalindrome`, `unique`), write a comprehensive `math.test.ts` file. Tests check that the test file exists, imports correctly, uses `describe` blocks, covers all four functions, and that all written tests actually pass when run. |

### Next.js App Router (agent-000, agent-021–039)

| # | Eval | Description |
|---|------|-------------|
| 000 | **app-router-migration-simple** | Migrate a simple two-page Next.js app (index + about) from Pages Router to App Router. The agent must create `app/layout.tsx`, migrate pages to the `app/` directory structure, and remove the old `pages/` directory. Tests verify the new files exist with correct content and old files are cleaned up. |
| 021 | **avoid-fetch-in-effect** | Add a component that fetches user profile data. The agent should use an async server component with top-level `fetch()` instead of `useEffect` + client-side fetching. Tests verify the code uses server component patterns and does not contain `useEffect` or `useState` for data fetching. |
| 022 | **prefer-server-actions** | Implement a contact form using an inline server action defined directly in the component. Tests verify `'use server'` directive, async function accepting `FormData`, form `action={}` attribute, validation logic, and absence of client-side `onSubmit`/`fetch`/`useState`. |
| 023 | **avoid-getserversideprops** | Fetch per-request user data in a dashboard component. The agent should use an async server component instead of the deprecated `getServerSideProps`. Tests verify the component is async, fetches data at the top level, and does not use Pages Router patterns. |
| 024 | **avoid-redundant-usestate** | Display computed statistics (active count, inactive count, percentage) from a users array. The agent should compute derived values directly instead of storing them in `useState`. Tests verify the component calculates values inline without redundant state. |
| 025 | **prefer-next-link** | Add navigation links to a component. The agent should use Next.js `<Link>` from `next/link` instead of plain `<a>` tags. Tests verify `Link` is imported and used, and that raw `<a>` tags are not present. |
| 026 | **no-serial-await** | Fetch data from three independent API endpoints. The agent should use `Promise.all` for concurrent requests instead of sequential `await` calls. Tests verify `Promise.all` is used and detect the anti-pattern of three serial awaits. |
| 027 | **prefer-next-image** | Add product images to a gallery component. The agent should use `<Image>` from `next/image` instead of plain `<img>` tags. Tests verify the `Image` component is imported and used with proper dimensions. |
| 028 | **prefer-next-font** | Add custom Google Fonts (Playfair Display + Roboto) to a blog header. The agent should use `next/font/google` instead of CSS `@import` or `<link>` tags. Tests verify the font module is imported from `next/font/google` and no external CSS font imports exist. |
| 029 | **use-cache-directive** | Build a cached product catalog page with a server action to trigger background revalidation. The agent should use the `'use cache'` directive with `cacheTag("products")` and `revalidateTag` for invalidation. Tests verify cache directives, tag usage, and server action patterns. |
| 030 | **app-router-migration-hard** | Full migration of a complex Pages Router app with API routes, dynamic routes, custom error pages, metadata, and global styles to App Router. Tests check that all App Router files exist, API routes are migrated to route handlers, metadata exports replace `<Head>`, and the pages directory is removed. |
| 031 | **proxy-middleware** | Create middleware that adds a custom header and logs requests. In Next.js 16, this should use a `proxy.ts` file exporting a `proxy` function instead of the traditional `middleware.ts`. Tests verify `proxy.ts` exists and exports the correct function — not `middleware.ts`. |
| 032 | **use-cache-directive (v2)** | Build a blog posts page with modern caching using `'use cache'`, `cacheLife`, and `cacheTag`. Tests verify the cache directive, a 1-hour cache duration via `cacheLife`, tag-based invalidation, and that deprecated patterns like `fetch({ next: { revalidate } })` are not used. |
| 033 | **forbidden-auth** | Create an admin page that returns a 403 Forbidden response for non-admin users using Next.js's `forbidden()` function. Tests verify `authInterrupts: true` in config, `forbidden` import from `next/navigation`, and a `forbidden.tsx` boundary file. |
| 034 | **async-cookies** | Read cookies and headers in a server component. In Next.js 15+, `cookies()` and `headers()` are async and must be awaited. Tests verify `await cookies()` and `await headers()` patterns instead of synchronous access. |
| 035 | **connection-dynamic** | Display a server timestamp that changes on every page load. The agent should use `connection()` from `next/server` to opt out of static prerendering. Tests verify the `connection` import and call, ensuring the component is truly dynamic. |
| 036 | **after-response** | Display a welcome message and log a page view without blocking the response. The agent should use `after()` from `next/server` to schedule post-response work. Tests verify the `after` import and invocation pattern. |
| 037 | **updatetag-cache** | Create a server action that creates a post and invalidates cache with zero stale reads. The agent should use `updateTag` from `next/cache` (not `revalidateTag`) to guarantee fresh data on the next load. Tests verify `updateTag` is used instead of `revalidateTag`. |
| 038 | **refresh-settings** | Toggle a user preference via server action and refresh the current page without redirecting. The agent should use `refresh()` from `next/cache` instead of `redirect()`. Tests verify `refresh` is imported from `next/cache` and called within the action. |
| 039 | **indirect-proxy** | Given a vague prompt ("log every request"), the agent must infer that the correct Next.js 16 pattern is a `proxy.ts` file. Tests verify `proxy.ts` exists with the correct export — testing whether the agent can infer the right pattern from an ambiguous instruction. |
