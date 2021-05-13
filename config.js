module.exports = {
    development: {
        mongoURI: 'mongodb://brain1uMMong0User:PL5qnU9nuvX0pBa@nodeserver.mydevfactory.com:27017/the_wealth_gap?authSource=admin',
        db: 'the_wealth_gap',
        redis: {
            host: "127.0.0.1",
            port: 3200,
            reminder_db: 0
        },
        auth: {
            secret: 'twg-67125',
            issuer: 'brainiuminfotech.com'
        },
        email: {
            url: 'smtps://avijit.team@gmail.com:avijit_team@smtp.gmail.com',
            service: "gmail",
            auth: {
                user: "avijit.team@gmail.com",
                pass: "avijit_team"
            },
            skip: false
        },
        port: {
            http: 3200,
            https: 3201
        },
        url: 'http://localhost:3200',
        website_url: 'http://localhost:4200/#',
        fcm: false,
        https: {
            key: "E:/brainium-projects/https-key/privkey.pem",
            cert: "E:/brainium-projects/https-key/fullchain.pem",
            passphrase: "brainium123"
        },
        socket: {
            cors: {
                //   origin: "http://localhost:4200",
                origins: ["*"],
                methods: ["GET", "POST"],
                // allowedHeaders: ["my-custom-header"],
                credentials: true
            },
            allowEIO3: true
        }
    },
    production: {
        mongoURI: 'mongodb://brain1uMMong0User:PL5qnU9nuvX0pBa@nodeserver.mydevfactory.com:27017/the_wealth_gap?authSource=admin',
        db: 'the_wealth_gap',
        redis: {
            host: "127.0.0.1",
            port: 3200,
            reminder_db: 0
        },
        auth: {
            secret: 'twg-67125',
            issuer: 'brainiuminfotech.com'
        },
        email: {
            url: 'smtps://avijit.team@gmail.com:avijit_team@smtp.gmail.com',
            service: "gmail",
            auth: {
                user: "avijit.team@gmail.com",
                pass: "avijit_team"
            },
            skip: false
        },
        port: {
            http: 3420,
            https: 3421
        },
        url: 'https://nodeserver.mydevfactory.com:3421',
        website_url: 'https://nodeserver.mydevfactory.com/debargha/the-wealth-gap/#',
        fcm: false,
        https: {
            key: '/etc/letsencrypt/live/nodeserver.mydevfactory.com/privkey.pem',
            cert: '/etc/letsencrypt/live/nodeserver.mydevfactory.com/fullchain.pem'
        },
        socket: {
            cors: {
                //   origin: "http://localhost:4200",
                origins: ["*"],
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            },
            allowEIO3: true
        }
    }
}
