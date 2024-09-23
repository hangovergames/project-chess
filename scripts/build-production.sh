#!/bin/bash
cd "$(dirname "$0")/.."

if test "x$BUILD_VERSION" = x; then
  echo 'BUILD_VERSION not defined' >&2
  exit 1
fi

export REACT_APP_VERSION="$BUILD_VERSION"

set -e
set -x

(
    cd frontend
    REACT_APP_PUBLIC_URL='https://chess.hangover.games' PUBLIC_URL='https://chess.hangover.games' npm run build
)

git add -f */build
