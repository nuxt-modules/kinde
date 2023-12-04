import { useState } from "#imports";
import type { AuthState } from "./types";

export const useAuth = () => {
  return useState<AuthState>('auth').value
}

