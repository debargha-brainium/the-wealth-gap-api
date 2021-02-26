module.exports = [
    {
        path: '/login',
        controller: 'common.login',
        method: 'post',
        raw: true
    },
    {
        path: '/get-countries',
        controller: 'common.getCountries',
        raw: true
    },
    {
        path: '/get-states/:country_code',
        controller: 'common.getStates',
        raw: true
    },
    {
        path: '/get-cms-details',
        controller: 'common.getCMSDetails',
        raw: true
    },
    {
        path: '/send-reset-password-email',
        controller: 'common.sendResetPasswordEmail',
        raw: true
    },
    {
        path: '/reset-password',
        middleware: 'validation.resetPassword',
        controller: 'common.resetPassword',
        method: 'post',
        raw: true
    },
    {
        path: '/get-languages',
        controller: 'common.getLanguageList',
        raw: true
    },
    {
        path: '/get-language-details/:language_id',
        controller: 'common.getLanguageDetails',
        raw: true
    },
]
