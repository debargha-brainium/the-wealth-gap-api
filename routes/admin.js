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
        path: '/delete-user/:user_id',
        controller: 'admin.deleteUser',
        method: 'post',
        raw: true
    },
    {
        path: '/get-users',
        controller: 'admin.getUserList',
        raw: true
    },
    {
        path: '/get-user-details/:user_id',
        controller: 'admin.getUserDetails',
        raw: true
    }
]
