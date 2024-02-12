export const generateAuthUrlParams = (
  orgCode: string | undefined,
  authUrlParams: object | undefined,
  postLoginRedirectURL?: string | undefined,
) => {
  const params = new URLSearchParams();
  let paramsObj: any = {};
  if (orgCode != null) paramsObj.org_code = orgCode;
  if (postLoginRedirectURL != null)
    paramsObj.post_login_redirect_url = postLoginRedirectURL;

  paramsObj = {...authUrlParams, ...paramsObj};

  for (const key in paramsObj) params.append(key, paramsObj[key]);
  return params;
};
