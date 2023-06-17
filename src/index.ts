import { VarConfig } from "./config";

declare global {
  // eslint-disable-next-line no-var
  var smartVarConfig: VarConfig | undefined;
}

export { requestString, requestPort, requestNumber } from "./requestors";
