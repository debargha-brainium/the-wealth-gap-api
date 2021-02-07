exports.settings = {}

exports.cms_contents = [
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
]


exports.email_templates = [
    {
        template_name: "Forgot-Password",
        content: `<div><p>Dear User,</p><p>Click on the link below to reset your password - </p><p>{{ link }} </p><br><p>Thank you,</p><p>Admin</p></div>`
    }
]
