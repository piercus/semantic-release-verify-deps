const test = require('ava');
const plugin = require('..');

test('check that normal dependencies are working', t => {
	return plugin.verifyConditions({
		pkgPath: './test/helpers/passingpackage.json',
		devDependencies: true,
		dependencies: true,
		regExps: []
	}).then(t.pass(t));
});

test.failing('check that invalid dependencies are working', t => {
    t.throws(plugin.verifyConditions(
        {pkgPath: './test/helpers/failingpackage.json', devDependencies: true, dependencies: true, regExps: ['[a-zA-Z]+$']}
    )).then(err => {
t.truthy(err.message);
    });
});
