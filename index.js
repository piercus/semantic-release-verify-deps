const readPkg = require('read-pkg');
const AggregateError = require('aggregate-error');

/**
 * Determine the type of release to create based on a list of commits.
 *
 * @param {Object} [pluginConfig={}] verify-conditions plugin configuration
 * @param {string|Array} pluginConfig.regExps regular expressions to filter invalid dependencies
 * @param {Object} pluginConfig.dependencies dependencies from package.json to check
 * @param {Object} pluginConfig.devDependencies devDependencies from package.json to check
 * @param {string} pluginConfig.pkgPath path to package.json
 *
 */

function verifyConditions(pluginConfig) {
	return readPkg(pluginConfig.pkgPath).then(pkg => {
		const dependenciesToCheck = {};

		if (pluginConfig.dependencies) {
			Object.assign(dependenciesToCheck, pkg.dependencies);
		}

		if (pluginConfig.devDependencies) {
			Object.assign(dependenciesToCheck, pkg.devDependencies);
		}

		const errors = [];
		const regexps = pluginConfig.regExps;
		regexps.forEach(exp => {
			const regexp = new RegExp(exp);

			for (const i in dependenciesToCheck) {
				if (Object.prototype.hasOwnProperty.call(dependenciesToCheck, i)) {
					if (regexp.test(dependenciesToCheck[i])) {
						errors.push(new Error('invalid dependency in : ' + i + ': ' + dependenciesToCheck[i]));
					}
				}
			}
		});
		if (errors.length > 0) {
			return Promise.reject(new AggregateError(errors));
		}
		return Promise.resolve();
	});
}
module.exports = {verifyConditions};
