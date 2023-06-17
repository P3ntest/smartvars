import { findVar } from "./values";

export function requestString(name: string, defaultValue?: string): string {
  const value = findVar(name);

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`SmartEnv: Could not find required variable ${name}`);
  }

  return String(value);
}

export function requestNumber(name: string, defaultValue?: number): number {
  const value = findVar(name);

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`SmartEnv: Could not find required variable ${name}`);
  }

  const parsed = Number(value);

  if (isNaN(parsed)) {
    throw new Error(`SmartEnv: Variable ${name} is not a number`);
  }

  return parsed;
}

export function requestPort(name: string, defaultValue?: number): number {
  const value = requestNumber(name, defaultValue);

  if (value < 0 || value > 65535) {
    throw new Error(
      `SmartEnv: Variable ${name} is not a valid port number (0-65535)`
    );
  }

  return value;
}
