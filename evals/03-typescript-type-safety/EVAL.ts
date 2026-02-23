import { expect, test } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const filePath = join(__dirname, 'types.ts');

test('TypeScript compiles without errors', () => {
  const result = execSync('npx tsc --noEmit', { cwd: __dirname, encoding: 'utf-8', stdio: 'pipe' }).toString();
  // If tsc exits with code 0, it compiled successfully
});

test('does not use any type', () => {
  const content = readFileSync(filePath, 'utf-8');
  // Allow "any" in comments but not in type positions
  const lines = content.split('\n').filter(l => !l.trim().startsWith('//'));
  const codeOnly = lines.join('\n');
  expect(codeOnly).not.toMatch(/:\s*any[\s;,)]/);
});

test('does not use type assertions (as keyword for casting)', () => {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => !l.trim().startsWith('//'));
  const codeOnly = lines.join('\n');
  // Check for "as SomeType" but not "as const"
  expect(codeOnly).not.toMatch(/\bas\s+(?!const\b)[A-Z]\w*/);
});

test('exports all required functions', () => {
  const content = readFileSync(filePath, 'utf-8');
  expect(content).toMatch(/export.*toString/);
  expect(content).toMatch(/export.*createUser/);
  expect(content).toMatch(/export.*getProperty/);
  expect(content).toMatch(/export.*area/);
  expect(content).toMatch(/export.*getFirstChar/);
});

test('area function handles both Circle and Rectangle', () => {
  const content = readFileSync(filePath, 'utf-8');
  expect(content).toMatch(/width/);
  expect(content).toMatch(/height/);
  expect(content).toMatch(/radius/);
});

test('getFirstChar handles null case', () => {
  const content = readFileSync(filePath, 'utf-8');
  // Should have some form of null check
  expect(content).toMatch(/null|str\s*===?\s*null|str\s*!==?\s*null|\?\.|if\s*\(\s*!?\s*str/);
});
