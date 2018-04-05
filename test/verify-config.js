const test = require('ava');
const plugin = require('..');

test('check that normal dependencies are working', t => { // Xo: Prefer using async/await instead of returning a Promise
	return plugin.verifyConditions({ // Xo: Unknown assertion method bind
		pkgPath: './test/helpers/passingpackage.json',
		devDependencies: true,
		dependencies: true,
		regExps: []
	}).then(t.pass.bind(t));
});


test.failing('rejects', t => {
    const error = t.throws(
    plugin.verifyConditions({
        pkgPath: './test/helpers/failingpackage.json',
        devDependencies: true,
        dependencies: true,
        regExps: ["[a-zA-Z]+$"]
    })).then(err => {console.log ("err:", err);}); 
    t.fail();
});
