import type { LoginURLOptions, AuthURLOptions } from "@kinde-oss/kinde-typescript-sdk";

export const generateAuthUrlParams = (
  props: AuthURLOptions | LoginURLOptions
) => {
  const params = new URLSearchParams();
  const paramsObj: { [key: string]: any } = {...props.authUrlParams, ...props};
  for (const key in paramsObj) {
    paramsObj[key] && params.append(key, paramsObj[key]);
  }
  return params;
};
