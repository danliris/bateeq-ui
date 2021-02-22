export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "core", "master", "manufacture", "inventory", "inventory-azure", "merchandiser", "md", "sales", "purchasing", "purchasing-azure", "finance", "ncore", "nmasterplan", "nsales","nmerchandiser", "purchasingJob","garment-production"],

    loginUrl: "/authenticate",
    profileUrl: "/me",

    authTokenType:"Bearer",
    //authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};
