import { config } from "dotenv";
import { VarProvider } from ".";
config();

export const EnvProvider: VarProvider = {
  dynamic: false,
  getVar(name) {
    const envName = getEnvName(name);
    if (process.env[envName]) {
      return process.env[envName];
    }
    if (process.env[name]) {
      return process.env[name];
    }
    return undefined;
  },
};

function getEnvName(name: string): string {
  // First split camelCase
  name = name.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Uppercase and replace . and - and space with _
  return name
    .toUpperCase()
    .replace(/[.\-\s]/g, "_")
    .trim();
}
