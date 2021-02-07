var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.plugin((schema, options) => {
    var indexes = schema.indexes();
    if (indexes.length == 0) return;
    var postHook = (error, _, next) => {
        if (error.name == 'MongoError' && error.code == 11000) {
            var regex = /index: (.+) dup key:/;
            var matches = regex.exec(error.message);
            if (matches) {
                matches = matches[1];
                for (var i = 0; i < indexes.length; i++) {
                    for (var field in indexes[i][0]) {
                        if (indexes[i][1].unique && (matches.indexOf('$' + field) >= 0 || matches.indexOf(field) >= 0)) {
                            var e = {}
                            let fld = (field == 'email' ? 'email' : field);
                            e[fld] = new mongoose.Error.ValidatorError({
                                type: 'unique',
                                path: fld,
                                message: fld + ' already exist'
                            })
                            var newError = new mongoose.Error.ValidationError();
                            newError.errors = e;
                            return next(newError);
                        }
                    }
                }
            }
        }
        next(error);
    }
    schema.post('save', postHook);
    schema.post('update', postHook);
    schema.post('findOneAndUpdate', postHook);
})

exports.connect = (seed) => {
    var con = mongoose.connect(config.mongoURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    con.then(() => {
        console.log('successfully connected to database');
        if (seed)
            require('./seeders').seed(['admin', 'cms', 'email_template']);//disable this line if you don't want default admin seeding
        else
            return con;
    }).catch((e) => {
        if (e.name == "MongoError") {
            console.log("Cannot connect to database. Please check your database connection.");
            process.exit(1);
        } else
            console.log(e)
    })

}
