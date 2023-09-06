import {
    createKindeServerClient,
    GrantType,
    type ACClientOptions,
    type PKCEClientOptions,
    type CCClientOptions,
    type ACClient,
    type CCClient
} from "@kinde-oss/kinde-typescript-sdk";

const config = useRuntimeConfig()

const clientOptions: ACClientOptions = {
    authDomain: config.kinde.authDomain,
    clientId: config.kinde.clientId,
    clientSecret: config.kinde.clientSecret,
    logoutRedirectURL: config.kinde.logoutRedirectURL,
    redirectURL: config.kinde.redirectURL
};

//AUTHORIZATION_CODE client
// const kindeClient = createKindeServerClient<ACClient, ACClientOptions>(
//     GrantType.AUTHORIZATION_CODE,
//     clientOptions
// );

//or PKCE client
export const kindeClient = createKindeServerClient<ACClient, PKCEClientOptions>(
    GrantType.PKCE,
    clientOptions
);

//or CLIENT_CREDENTIALS client
// const kindeClient = createKindeServerClient<CCClient, CCClientOptions>(
//     GrantType.CLIENT_CREDENTIALS,
//     clientOptions
// );
