# Add Error Handling

The file `api.ts` contains functions that make unsafe operations without any error handling. Add proper error handling to all functions.

## Your Task

Add error handling to every function in `api.ts`:
- Functions that parse JSON should handle parse errors
- Functions that access nested properties should handle null/undefined
- Functions that do division should handle divide-by-zero
- All functions should return a Result type: `{ success: true, data: T } | { success: false, error: string }`
- Do NOT change the function signatures — only add error handling inside the functions and wrap the return type in Result
