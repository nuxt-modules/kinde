import { useState } from "#imports";
import type { AuthState } from "./types";

export const useAuth = () => {
  return useState('auth').value as AuthState;
}

