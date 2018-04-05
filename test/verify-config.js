const test = require('ava');
const plugin = require('..');


/* test('check that normal dependencies are working', t => {
    return plugin.verifyConditions({
		pkgPath: './test/helpers/passingpackage.json',
		devDependencies: true,
		dependencies: true,
		regExps: []
	}).then(() => {
        t.pass();
       })
}); */

test('check that normal dependencies are working', t => {
    return plugin.verifyConditions({
        pkgPath: './test/helpers/passingpackage.json',   // it fails but works with failingpackage.json 
        devDependencies: true,
        dependencies: true,
        regExps: []
    }).then(t.pass);;
});


/*
 Test('check that normal dependencies are working', function(){
         const error = t.throws(() => {
            plugin.verifyConditions({
        regExps: []
               pkgPath: './test/data/failingpackage.json',
               devDependencies: true,
               dependencies: true,
               regExps: ["[a-zA-Z]+$"]
            })
     });

     t.is(error.message);
 }); */
