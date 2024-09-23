#!/bin/bash
cd "$(dirname "$0")/.."

if test "x$BUILD_VERSION" = x; then
  echo 'BUILD_VERSION not defined' >&2
  exit 1
fi

set -e
set -x

git add -f */build
