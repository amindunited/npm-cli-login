#!/usr/bin/env bash
set -e;

echo;

jshint --version;
jshint lib bin;
echo "No code lint issues found.";

mocha tests
