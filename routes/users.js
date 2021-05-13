module.exports = [
    {
        path: '/register-user',
        // middleware: 'token.validateToken',
        controller: 'users.signUpUser',
        method: 'post',
        raw: true
    },
    {
        path: '/update-profile',
        middleware: 'token.validateToken',
        controller: 'users.updateProfile',
        method: 'post',
        raw: true
    },
    {
        path: '/get-my-profile',
        middleware: 'token.validateToken',
        controller: 'users.getUserDetails',
        raw: true
    },
    {
        path: '/get-user-list',
        middleware: 'token.validateToken',
        controller: 'users.getUserList',
        raw: true
    },
]