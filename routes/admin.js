module.exports = [
    {
        path: '/get-cms-list',
        controller: 'admin.listCMS',
        raw: true
    },
    {
        path: '/update-cms/:cms_id',
        controller: 'admin.editCMSPage',
        method: 'post',
        raw: true
    },
    {
        path: '/add-user',
        controller: 'admin.addUser',
        method: 'post',
        raw: true
    },
    {
        path: '/update-user/:user_id',
        controller: 'admin.editUser',
        method: 'post',
        raw: true
    },
    {
        path: '/get-users',
        controller: 'admin.getUserList',
        // method: 'post',
        raw: true
    },
    {
        path: '/get-user-details',
        controller: 'admin.getUserDetails',
        raw: true
    }
]
