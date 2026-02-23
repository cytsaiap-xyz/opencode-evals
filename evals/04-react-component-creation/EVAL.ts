import { expect, test } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const componentPath = join(__dirname, 'app', 'components', 'SearchFilter.tsx');
const pagePath = join(__dirname, 'app', 'page.tsx');

test('SearchFilter component file exists', () => {
  expect(existsSync(componentPath)).toBe(true);
});

test('component is a client component', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/['"]use client['"]/);
});

test('component uses useState for filtering', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/useState/);
});

test('component renders an input element', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/<input/);
});

test('component renders a list', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/<ul/);
  expect(content).toMatch(/<li/);
});

test('component implements case-insensitive filtering', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/toLowerCase|toLocaleLowerCase|includes/);
});

test('component handles no results', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/[Nn]o results|[Nn]o items|[Nn]othing found|length\s*===?\s*0/);
});

test('component accepts items and placeholder props', () => {
  const content = readFileSync(componentPath, 'utf-8');
  expect(content).toMatch(/items/);
  expect(content).toMatch(/placeholder/);
});

test('page.tsx imports and uses SearchFilter', () => {
  const content = readFileSync(pagePath, 'utf-8');
  expect(content).toMatch(/SearchFilter/);
  expect(content).toMatch(/import/);
});
