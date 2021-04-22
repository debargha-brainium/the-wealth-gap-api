const {EMAIL_TEMPLATE} = require('../database/models');

module.exports = {
    settings: {},

    cms_contents: [
        {
            page_name: 'Terms and Conditions',
            slug: 'terms-and-conditions',
            page_content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Maecenas vitae dictum lorem. Maecenas non tincidunt orci. 
                  Mauris vel finibus sapien. In malesuada ligula iaculis tristique fringilla. 
                  Donec tempus condimentum sodales. Nulla suscipit sapien sit amet augue fermentum, 
                  id sagittis risus eleifend. Proin interdum justo sit amet nisl ornare porta. 
                  Proin iaculis orci libero, et dapibus velit eleifend pulvinar. 
                  Phasellus ut ligula eros. Proin dui risus, fringilla sed dapibus ac, convallis ut nunc. 
                  Vivamus ut enim dapibus, auctor dolor vel, consequat est. 
                  Aenean iaculis cursus sem, sit amet lacinia mauris venenatis id. 
                  Fusce semper nisl in elit accumsan consequat.</p>`,
            meta_title: 'Terms and Conditions',
            meta_description: 'The Wealth Gap Terms and Conditions',
            meta_keywords: '',
            status: true,
            built_in: true
        },
        {
            page_name: 'Privacy Policy',
            slug: 'privacy-policy',
            page_content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Maecenas vitae dictum lorem. Maecenas non tincidunt orci. 
                  Mauris vel finibus sapien. In malesuada ligula iaculis tristique fringilla. 
                  Donec tempus condimentum sodales. Nulla suscipit sapien sit amet augue fermentum, 
                  id sagittis risus eleifend. Proin interdum justo sit amet nisl ornare porta. 
                  Proin iaculis orci libero, et dapibus velit eleifend pulvinar. 
                  Phasellus ut ligula eros. Proin dui risus, fringilla sed dapibus ac, convallis ut nunc. 
                  Vivamus ut enim dapibus, auctor dolor vel, consequat est. 
                  Aenean iaculis cursus sem, sit amet lacinia mauris venenatis id. 
                  Fusce semper nisl in elit accumsan consequat.</p>`,
            meta_title: 'Privacy Policy',
            meta_description: 'The Wealth Gap Privacy Policy',
            meta_keywords: '',
            status: true,
            built_in: true
        }
    ],


    email_templates: [
        {
            template_name: EMAIL_TEMPLATE.template.forgot_password,
            content: `<div><p>Dear User,</p><p>Click on the link below to reset your password - </p><p>{{ link }} </p><br><p>Thank you,</p><p>Admin</p></div>`
        },
        {
            template_name: EMAIL_TEMPLATE.template.registration,
            content: `<h2>Welcome to IncomePa$$</h2><br><p>Dear {{firstname}},</p><p>You have successfully registered in IncomePass</p> <br> <p>Thank you,</p> <p>Admin</p>`
        },

        {
            template_name: EMAIL_TEMPLATE.template.account_verification,
            content: `<h2>Dear User,</h2><br><h2>This is your one-time password {{ otp }} </h2> <br> <p>Enter the otp in the app to verify your identity</p> <p>Thank you,</p> <p>Admin</p>`
        },
    ]
}