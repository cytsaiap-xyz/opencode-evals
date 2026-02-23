/**
 * Returns a paginated slice of the array.
 * Pages are 1-based (page 1 = first page).
 */
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  // Bug: using 0-based calculation but not adjusting for 1-based page
  const start = page * pageSize;
  const end = start + pageSize;
  return items.slice(start, end);
}

/**
 * Returns the last index in the array where the predicate returns true.
 * Returns -1 if no element matches.
 */
export function findLastIndex<T>(arr: T[], predicate: (item: T) => boolean): number {
  // Bug: starting from arr.length instead of arr.length - 1
  for (let i = arr.length; i >= 0; i--) {
    if (predicate(arr[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * Splits an array into chunks of the specified size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  // Bug: using < instead of <= causes the last partial chunk to be missed,
  // AND incrementing by size+1
  for (let i = 0; i < arr.length - size; i += size + 1) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
