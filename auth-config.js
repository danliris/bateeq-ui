export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "master","inventory", "merchandiser", "sales"],

    loginUrl: "/authenticate",
    profileUrl: "/me",

    authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};