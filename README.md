# Semantic-release-verify-deps
Verify the format of dependencies before releasing with [semantic-release](https://github.com/semantic-release/semantic-release).

## Usage
Plugin can be set within the plugin definition in the Semantic-release configuration file on Verify Conditions step in the project's `package.json` file.

For example:

```
"release": {
    "verifyConditions": [
      "@semantic-release/git",
      "@semantic-release/github",
      {
        "path": "semantic-release-verify-deps",
        "dependencies": true,
        "devDependencies": false,
        "regExps": [
          "\\D$", "\\d$"
        ]
      }
    ]
```
## Configuration

**Parameters:**

|Parameter|Description|Type|
|---------|-----------|----|
|dependencies|dependencies that are specified in `package.json` file| boolean|
|devDependencies|dependencies that are specified in `package.json` file| boolean|
|regExps|[regular expresions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) that will be used as pattern in [RegExp Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to match invalid dependencies in `package.json` file | array of patterns|

## Usage examples

**Configuration:**
```
"release": {
    "verifyConditions": [
      "@semantic-release/git",
      "@semantic-release/github",
      {
        "path": "semantic-release-verify-deps",
        "dependencies": true,
        "devDependencies": true,
        "regExps": [
          "\\D$"
        ]
      }
    ]
```
### Success:
All dependencies were validated with RegExp. No matches were found. 
**Sample of dependencies:**
```
{
    "devDependencies": {
      "@semantic-release/git": "^2.2.1"
    },
    "dependencies": {
      "winston": "^2.2.0"
    }
  } 
```
**Output:**
```
[Semantic release]: Load plugin verifyConditions from @semantic-release/git
[Semantic release]: Load plugin verifyConditions from @semantic-release/github
[Semantic release]: Load plugin verifyConditions from semantic-release-verify-deps
[Semantic release]: Load plugin getLastRelease from @semantic-release/git
[Semantic release]: Run automated release from branch master
[Semantic release]: Call plugin verify-conditions
[Semantic release]: Verify authentication for repository git+ssh://git@github.com/teamklap/lib-node-FfmpegEngine.git
[Semantic release]: Verify GitHub authentication
[Semantic release]: Call plugin get-last-release
.........
```

### Fail:
All dependencies were validated with RegExps. One or more matches were found. Semantic-release Verify Cnditions step failed  with an *error*

**Sample of dependencies:**
```
{
    "devDependencies": {
      "@semantic-release/git": "^2.2.1",
      "grunt-bump": "^0.8.x"
    },
    "dependencies": {
      "fluent-ffmpeg": "^2.1.x",
      "winston": "^2.2.0"
    }
  } 
```

**Output:**
```
[Semantic release]: Load plugin verifyConditions from @semantic-release/git
[Semantic release]: Load plugin verifyConditions from @semantic-release/github
[Semantic release]: Load plugin verifyConditions from semantic-release-no-untagged-github-deps
[Semantic release]: Call plugin verify-conditions
[Semantic release]: Verify authentication for repository git+ssh://git@github.com/teamklap/sample.git
[Semantic release]: Verify GitHub authentication
[Semantic release]: An error occurred while running semantic-release: {
AggregateError:
    Error: invalid dependency in : fluent-ffmpeg: ^2.1.x
        at regexps.forEach.exp (/home/user/Documents/semantic-release-verify-deps/index.js:35:19)
        at Array.forEach (<anonymous>)
        at readPkg.then.pkg (/home/user/Documents/semantic-release-verify-deps/index.js:29:11)
        at <anonymous>
    Error: invalid dependency in : grunt-bump: ^0.8.x
        at regexps.forEach.exp (/home/user/Documents/semantic-release-verify-deps/index.js:35:19)
        at Array.forEach (<anonymous>)
        at readPkg.then.pkg (/home/user/Documents/semantic-release-verify-deps/index.js:29:11)
        at <anonymous>
    at readPkg.then.pkg (/home/user/Documents/semantic-release-verify-deps/index.js:41:26)
    at <anonymous> name: 'AggregateError'
}
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! Exit status 1
```
