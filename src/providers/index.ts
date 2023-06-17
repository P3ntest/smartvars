import { VarValue } from "../values";

export interface VarProvider {
  getVar(name: string): VarValue | undefined;
  setVar?: (name: string, value: VarValue) => void;
  dynamic: boolean;
}
