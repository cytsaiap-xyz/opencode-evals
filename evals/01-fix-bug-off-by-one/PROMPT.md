# Fix the Off-by-One Bug

The file `utils.ts` contains several array utility functions. However, there are off-by-one bugs causing incorrect results.

## Your Task

Fix all the bugs in `utils.ts` so that the functions work correctly:

1. `paginate(items, page, pageSize)` — should return the correct slice of items for the given 1-based page number
2. `findLastIndex(arr, predicate)` — should return the last index where the predicate is true, or -1 if not found
3. `chunk(arr, size)` — should split an array into chunks of the given size
