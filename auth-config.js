export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "master", "manufacture", "inventory", "inventory-azure", "merchandiser", "md", "sales", "purchasing", "purchasing-azure", "finance", "ncore", "nmasterplan", "garment-production", "purchasing-job","pos","nmerchandiser"],

    loginUrl: "authenticate",
    profileUrl: "me",

    authTokenType:"Bearer",
    //authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};