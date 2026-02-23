import { expect, test } from 'vitest';
import { paginate, findLastIndex, chunk } from './utils';

test('paginate returns correct page for 1-based indexing', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  expect(paginate(items, 1, 3)).toEqual([1, 2, 3]);
  expect(paginate(items, 2, 3)).toEqual([4, 5, 6]);
  expect(paginate(items, 3, 3)).toEqual([7, 8, 9]);
  expect(paginate(items, 4, 3)).toEqual([10]);
});

test('findLastIndex returns correct last matching index', () => {
  const arr = [1, 2, 3, 2, 1];
  expect(findLastIndex(arr, (x) => x === 2)).toBe(3);
  expect(findLastIndex(arr, (x) => x === 1)).toBe(4);
  expect(findLastIndex(arr, (x) => x === 99)).toBe(-1);
});

test('chunk splits array correctly', () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  expect(chunk([1], 3)).toEqual([[1]]);
  expect(chunk([], 2)).toEqual([]);
});
