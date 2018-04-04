const test = require('ava');
const plugin = require('..');

test('check that normal dependencies are working',  t => {
    const res = plugin.verifyConditions({
        pkgPath: './test/helpers/testpackage.json',
        devDependencies: false,
        dependencies: true,
        regExps: []
     });
     console.log (res);
    // t.is(res);
 });
 
 /* 
 test('check that normal dependencies are working', function(){
         const error = t.throws(() => {
            plugin.verifyConditions({
               pkgPath: './test/data/failingpackage.json',
               devDependencies: true,
               dependencies: true,
               regExps: ["[a-zA-Z]+$"]
            })
     });
       
     t.is(error.message);
 }); */