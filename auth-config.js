export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "master", "manufacture", "inventory", "merchandiser", "md", "sales", "purchasing", "masterplan"],

    loginUrl: "/authenticate",
    profileUrl: "/me",

    authTokenType:"Bearer",
    //authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};
