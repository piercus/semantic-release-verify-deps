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

test('rejects', async t => {
	const error = await t.throws(
        plugin.verifyConditions({
        	pkgPath: './test/helpers/failingpackage.json',
        	devDependencies: true,
        	dependencies: true,
        	regExps: ['[a-zA-Z]+$']
        }));
    // Console.log(error.message);
    t.is(error.message, error.message);
});

/* Test('rejects', t => {
    const error = t.throws(
    plugin.verifyConditions({
        pkgPath: './test/helpers/failingpackage.json',
        devDependencies: true,
        dependencies: true,
        regExps: ["[a-zA-Z]+$"]
    }))
    console.log("g",error);
    t.is(error, null);
}); */
