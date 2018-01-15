export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "master", "manufacture", "inventory", "merchandiser", "md", "sales", "purchasing"],

    loginUrl: "/authenticate",
    profileUrl: "/me",

    authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};