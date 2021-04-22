module.exports = [
    {
        path: '/register-user',
        // middleware: 'token.validateToken',
        controller: 'users.signUpUser',
        method: 'post',
        raw: true
    }
]