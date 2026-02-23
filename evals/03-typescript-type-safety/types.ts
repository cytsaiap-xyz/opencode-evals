// 1. This function should accept either a string or number and return its string representation
function toString(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toFixed(2);
  return value.toString(); // should be unreachable
}

// 2. This interface and function have a mismatch
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return { name, email }; // missing id
}

// 3. This generic function has incorrect constraints
function getProperty(obj, key) {
  return obj[key];
}

// 4. This discriminated union is missing proper narrowing
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function area(shape: Shape): number {
  return shape.radius * shape.radius * Math.PI;
}

// 5. Nullable handling is missing
function getFirstChar(str: string | null): string {
  return str.charAt(0);
}

export { toString, createUser, getProperty, area, getFirstChar };
export type { User, Shape, Circle, Rectangle };
