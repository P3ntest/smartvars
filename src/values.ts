import { getVarConfig } from "./config";

export type VarValue = string | number | boolean;

export function findVar(name: string): VarValue | undefined {
  const config = getVarConfig();

  for (const layer of config.layers) {
    const value = layer.getVar(name);
    if (value) {
      return value;
    }
  }
  return undefined;
}
