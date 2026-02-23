import { expect, test } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const routePath = join(__dirname, 'app', 'api', 'todos', 'route.ts');

test('API route file exists', () => {
  expect(existsSync(routePath)).toBe(true);
});

test('exports GET handler', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/export\s+(async\s+)?function\s+GET/);
});

test('exports POST handler', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/export\s+(async\s+)?function\s+POST/);
});

test('exports PUT handler', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/export\s+(async\s+)?function\s+PUT/);
});

test('exports DELETE handler', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/export\s+(async\s+)?function\s+DELETE/);
});

test('uses NextResponse or Response', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/NextResponse\.json|Response\.json|new Response/);
});

test('handles request body parsing', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/request\.json\(\)|req\.json\(\)/);
});

test('includes todo data structure with id, title, completed', () => {
  const content = readFileSync(routePath, 'utf-8');
  expect(content).toMatch(/id/);
  expect(content).toMatch(/title/);
  expect(content).toMatch(/completed/);
});
