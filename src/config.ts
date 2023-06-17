import { VarProvider } from "./providers";
import { EnvProvider } from "./providers/env";

export interface VarConfig {
  layers: VarProvider[];
}

export function getVarConfig() {
  if (globalThis.smartVarConfig) {
    return globalThis.smartVarConfig;
  }

  const config: VarConfig = {
    layers: [EnvProvider],
  };

  globalThis.smartVarConfig = config;

  return config;
}
