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
| 01 | **fix-bug-off-by-one** | Fix intentional off-by-one bugs in three array utility functions (`paginate`, `findLastIndex`, `chunk`). |
| 02 | **nextjs-api-route** | Create a Next.js App Router API route with full CRUD (GET/POST/PUT/DELETE) for an in-memory TODO list. |
| 03 | **typescript-type-safety** | Fix five type errors across functions (missing types, unhandled unions, nullable access) without using `any` or `as`. |
| 04 | **react-component-creation** | Build a `SearchFilter` client component with real-time case-insensitive filtering and a "no results" state. |
| 05 | **data-transformation** | Implement three utility functions from stubs: record processing with grade assignment, grouping, and nested object flattening. |
| 06 | **error-handling** | Add `Result<T>` error handling (try-catch, null checks, divide-by-zero guards) to three unsafe functions. |
| 07 | **write-tests** | Write a comprehensive vitest test file for four existing utility functions (`factorial`, `fibonacci`, `isPalindrome`, `unique`). |

### Next.js App Router (agent-000, agent-021–039)

| # | Eval | Description |
|---|------|-------------|
| 000 | **app-router-migration-simple** | Migrate a two-page Next.js app from Pages Router to App Router and remove the old `pages/` directory. |
| 021 | **avoid-fetch-in-effect** | Fetch user profile data using an async server component instead of `useEffect` + client-side fetch. |
| 022 | **prefer-server-actions** | Implement a contact form using an inline `'use server'` action with `FormData` instead of client-side `onSubmit`/`fetch`. |
| 023 | **avoid-getserversideprops** | Fetch per-request data using an async server component instead of the deprecated `getServerSideProps`. |
| 024 | **avoid-redundant-usestate** | Compute derived statistics (counts, percentages) directly instead of storing them in redundant `useState`. |
| 025 | **prefer-next-link** | Add navigation links using Next.js `<Link>` from `next/link` instead of plain `<a>` tags. |
| 026 | **no-serial-await** | Fetch from three independent API endpoints concurrently with `Promise.all` instead of sequential awaits. |
| 027 | **prefer-next-image** | Display product images using `<Image>` from `next/image` instead of plain `<img>` tags. |
| 028 | **prefer-next-font** | Add Google Fonts using `next/font/google` instead of CSS `@import` or `<link>` tags. |
| 029 | **use-cache-directive** | Build a cached product catalog using `'use cache'` with `cacheTag` and `revalidateTag` for background invalidation. |
| 030 | **app-router-migration-hard** | Full migration of a complex app (API routes, dynamic routes, error pages, metadata) from Pages to App Router. |
| 031 | **proxy-middleware** | Add a request header and logging using Next.js 16's `proxy.ts` pattern instead of `middleware.ts`. |
| 032 | **use-cache-directive (v2)** | Cache a blog posts page using `'use cache'`, `cacheLife`, and `cacheTag` instead of deprecated fetch options. |
| 033 | **forbidden-auth** | Return a 403 for non-admin users using Next.js's `forbidden()` with `authInterrupts` config and a `forbidden.tsx` boundary. |
| 034 | **async-cookies** | Read cookies and headers in a server component using the async `await cookies()` / `await headers()` API. |
| 035 | **connection-dynamic** | Opt out of static prerendering using `connection()` from `next/server` to show a per-request timestamp. |
| 036 | **after-response** | Log analytics after the response is sent using `after()` from `next/server` without blocking rendering. |
| 037 | **updatetag-cache** | Invalidate cache after creating a post using `updateTag` (not `revalidateTag`) to guarantee zero stale reads. |
| 038 | **refresh-settings** | Refresh the current page after a server action using `refresh()` from `next/cache` instead of `redirect()`. |
| 039 | **indirect-proxy** | Infer that "log every request" requires a Next.js 16 `proxy.ts` file from a deliberately vague prompt. |

## Results

| Eval | MiniMax M2.5 | GLM-5 | Kimi K2.5 | Claude Opus | Claude Sonnet |
|------|:---:|:---:|:---:|:---:|:---:|
| 01 fix-bug-off-by-one | ✅ | ✅ | ✅ | ✅ | ✅ |
| 02 nextjs-api-route | ✅ | ✅ | ✅ | ✅ | ✅ |
| 03 typescript-type-safety | ❌ | ❌ | ❌ | ❌ | ❌ |
| 04 react-component-creation | ✅ | ✅ | ✅ | ✅ | ✅ |
| 05 data-transformation | ✅ | ✅ | ✅ | ✅ | ✅ |
| 06 error-handling | ✅ | ✅ | ✅ | ✅ | ✅ |
| 07 write-tests | ❌ | ❌ | ❌ | ❌ | ❌ |
| 000 app-router-migration-simple | ✅ | ✅ | ✅ | ✅ | ✅ |
| 021 avoid-fetch-in-effect | ✅ | ❌ | ❌ | ✅ | ✅ |
| 022 prefer-server-actions | ❌ | — | ❌ | ✅ | ✅ |
| 023 avoid-getserversideprops | ✅ | — | ✅ | ✅ | ✅ |
| 024 avoid-redundant-usestate | ✅ | — | ✅ | ✅ | ✅ |
| 025 prefer-next-link | ✅ | — | ✅ | ✅ | ✅ |
| 026 no-serial-await | ✅ | — | ✅ | ✅ | ✅ |
| 027 prefer-next-image | ✅ | — | ✅ | ✅ | ✅ |
| 028 prefer-next-font | ❌ | — | ❌ | ✅ | ✅ |
| 029 use-cache-directive | ❌ | — | ❌ | ✅ | ❌ |
| 030 app-router-migration-hard | ❌ | — | ❌ | ✅ | ✅ |
| 031 proxy-middleware | ❌ | — | ❌ | ❌ | ❌ |
| 032 use-cache-directive (v2) | ❌ | — | ❌ | ❌ | ❌ |
| 033 forbidden-auth | ✅ | — | ✅ | ✅ | ✅ |
| 034 async-cookies | ✅ | — | ✅ | ✅ | ✅ |
| 035 connection-dynamic | ❌ | — | ❌ | ✅ | ✅ |
| 036 after-response | ✅ | — | ✅ | ❌ | ❌ |
| 037 updatetag-cache | ✅ | — | ❌ | ✅ | ✅ |
| 038 refresh-settings | ❌ | — | ❌ | ❌ | ❌ |
| 039 indirect-proxy | ❌ | — | ❌ | ✅ | ❌ |
| | | | | | |
| **Total** | **16/27 (59%)** | **6/9 (67%)** | **14/27 (52%)** | **21/27 (78%)** | **19/27 (70%)** |

> ✅ = Pass · ❌ = Fail · — = Not tested
>
> **Note:** Evals 03, 07, 032, 038 had test bugs that caused false failures across all models. These have been [fixed](https://github.com/cytsaiap-xyz/opencode-evals/commit/949bed2). Results above reflect the original (pre-fix) runs.
