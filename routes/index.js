const routerJson = [
    {
        path: "/",
        view: "index.html"
    }, {
        path: "/api",
        children: [
            ...require('./admin'),
            ...require('./common'),
            ...require('./users'),
            ...require('./chat')
        ]
    }
];
module.exports = routerJson;
