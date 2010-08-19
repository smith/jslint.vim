#!/usr/bin/env node

var JSLINT = require("./jslint-core").JSLINT,
    print = require("sys").print,
    stdin = process.openStdin(),
    body = "";

stdin.on("data", function (chunk) { body += chunk; });

stdin.on("end", function () {
    var ok = JSLINT(body),
        i,
        error,
        errorCount;

    if (!ok) {
        errorCount = JSLINT.errors.length;
        for (i = 0; i < errorCount; i += 1) {
            error = JSLINT.errors[i];
            if (error && error.reason && error.reason.match(/^Stopping/) === null) {
                print([error.line, error.character, error.reason].join(":"));
            }
        }
    }
});
