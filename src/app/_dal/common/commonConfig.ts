export let commonConfig = {
    baseLink: 'http://localhost:8000/api',
    apiErrorMessage: 'Something went wrong, please try again later.',
    minLengthOfUsername: 2,
    maxLengthOfUsername: 20,
    userNameRegex: '^[a-zA-Z ]*$',
    minLengthOfIc: 14,
    icNoRegex: '^[0-9]{6}-[0-9]{2}-[0-9]{4}',
    minLengthOfPhoneNumber: 11,
    maxLengthOfPhoneNumber: 14,
    phoneNumberRegex: '^[6][0][1][0-9]{8,10}$',

    inventoryNameMinLength: 5,
    inventoryNameMaxLength: 50,
    inventoryCodeMinLength: 2,
    inventoryCodeMaxLength: 50,
    inventorySKUMinLength: 2,
    inventorySKUMaxLength: 30,
    inventoryDescMinLength: 5,
    inventoryDescMaxLength: 2000,
    inventoryCostMaxLength: 10,
    inventorySellingPriceMaxLength: 10,
    inventoryStockThresholdMaxLength: 3,

    nullSelectedInventoryPatternId: 9999,

    storeNameMinLength: 2,
    storeNameMaxLength: 40,
    storeContactNumMinLength: 11,
    storeContactNumMaxLength: 14,
    storeDescriptionMinLength: 10,
    storeDescriptionMaxLength: 500,
    storeNoStreetNameMaxLength: 200,
    storePostCodeMinLength: 5,
    storePostCodeMaxLength: 5,
    storeCountryMaxLength: 30,
    storeStateMaxLength: 30,
    storeCityMaxLength: 30,

    numericOnlyRegex: '^[0-9]+$',
    percentageRegex: '^[0-9]{1,3}$',

    blogNameMinLength: 2,
    blogNameMaxLength: 40,
    blogDescriptionMinLength: 5,
    blogDescriptionMaxLength: 500,

    articleTitleMaxLength: 200,
    articleDescriptionMaxLength: 1500,
    maxArticleImageNumbers: 5,

    channelNameMinLength: 2,
    channelNameMaxLength: 40,
    channelDescriptionMinLength: 5,
    channelDescriptionMaxLength: 1500,
    channelContactNumMinLength: 11,
    channelContactNumMaxLength: 14,

    videoTitleMaxLength: 100,
    videoLinkMaxLength: 200,
    videoIdMaxLength: 50,

    videoTotalLengthMaxLength: 50,
    currentPageSize: 20,

    inventoryFamilyNameMaxLength: 50,
    inventoryFamilyCodeMinLength: 2,
    inventoryFamilyCodeMaxLength: 30,
    inventoryFamilySKUMinLength: 2,
    inventoryFamilySKUMaxLength: 30,
    inventoryFamilyDescMinLength: 5,
    inventoryFamilyDescMaxLength: 500,
    inventoryFamilyCostMaxLength: 10,
    inventoryFamilySellingPriceMaxLength: 10,
    inventoryFamilyStockQuantityMaxLength: 3,

    inventoryPatternNameMaxLength: 50,
    inventoryPatternDescMinLength: 5,
    inventoryPatternDescMaxLength: 500,
    inventoryPatternCostMaxLength: 10,
    inventoryPatternSellingPriceMaxLength: 10,
    inventoryPatternStockQuantityMaxLength: 3
};
