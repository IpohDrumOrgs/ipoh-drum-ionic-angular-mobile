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
    phoneNumberRegex: '^[6][0][1][0-9]{8,10}$'
};
