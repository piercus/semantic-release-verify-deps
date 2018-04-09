# Semantic-release-verify-deps

[semantic-release](https://github.com/semantic-release/semantic-release) plugin to validate the format of dependencies before releasing.

## Why create this plugin

In the typical [gitflow](nvie.com/posts/a-successful-git-branching-model/) process, we release tags on master branch and we implement on develop branch.

When doing implementation we sometimes need to change deps to 'floating' deps like :
* [git](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies) private deps
* [local path](https://docs.npmjs.com/files/package.json#local-paths) deps.

Even if this is useful on `dev` branch, it is a bad idea to release on master branch a version with floating dependencies.

Current plugin lets you define a validation/regular expression pattern to avoid this kind of mistake.

## Installation

```js
npm install --save-dev semantic-release-verify-deps 
```

## Usage

Plugin must be set within the plugin definition in the Semantic-release configuration file on Verify Conditions step in the project's `package.json` file.

For example, you can force each dependency to finish with a digit in package.json by doing :

```
"release": {
    "verifyConditions": [
      {
        "path": "semantic-release-verify-deps",
        "dependencies": true,
        "devDependencies": false,
        "regExps": [
          "\\D$"
        ]
      }
    ]
```


## Configuration

**Parameters:**

|Parameter|Description|Type|Default|
|---------|-----------|----|---|
|dependencies|dependencies that are specified in `package.json` file| boolean| true|
|devDependencies|dependencies that are specified in `package.json` file| boolean| false|
|regExps|[regular expresions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) that will be used as pattern in [RegExp Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to match **invalid dependencies** in `package.json` file | array of patterns| [] |

## Regexps examples

`"\\D$"` : Each dependency ending without a digit is invalid for release

`"\\d$"` : Each dependency ending with a digit is invalid for release

`".*github.*"` : Each github dependency is invalid for release
