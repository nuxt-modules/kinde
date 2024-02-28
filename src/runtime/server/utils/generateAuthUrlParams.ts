import type { LoginURLOptions, AuthURLOptions } from "@kinde-oss/kinde-typescript-sdk";

export const generateAuthUrlParams = (
  props: AuthURLOptions | LoginURLOptions
) => {
  const params = new URLSearchParams();
  const propsClone = { ...props };
  delete propsClone.authUrlParams;
  const paramsObj: { [key: string]: any } = {...props.authUrlParams, ...propsClone};
  for (const key in paramsObj) {
    paramsObj[key] && params.append(key, paramsObj[key]);
  }
  return params;
};
