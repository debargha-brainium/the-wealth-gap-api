const allseeders = {
    admin: require('./admin.seeder'),
    cms: require('./cms.seeder'),
    email_template: require('./email_template.seeder'),
    // settings: require('./settings.seeder'),
    // view: require('./view.seeder'),
};
var seeder_names = exports.seeders = Object.keys(allseeders);
exports.seeder_names = seeder_names;

exports.seed = (seeders) => {
    var seedersToSeed;
    if (!seeders)
        seedersToSeed = seeder_names;// console.log('Seed All')
    else if (Array.isArray(seeders))
        seedersToSeed = seeders; //console.log('Seed all seeders from array')
    else
        seedersToSeed = [seeders] //console.log('Seed single seeder')
    Promise.all(seedersToSeed.map(seeder => allseeders[seeder]()))
        .then((values) => {
            console.log("Seeding complete. " + values.length + " seed(s)");
        })
}
