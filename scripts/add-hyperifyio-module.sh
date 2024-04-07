#!/bin/bash
cd "$(dirname "$0")/.."
set -e
#set -x

CONTEXT="$1"
NAME="$2"

if test "x$CONTEXT" = x || test "x$NAME" = x; then
  echo 'USAGE: ./scripts/add-hg-module.sh CONTEXT NAME' >&2
  echo '...where: context is backend | frontend | testing' >&2
  exit 1
fi

ORG='hyperifyio'
BRANCH='main'
DIR="$CONTEXT/src/io/hyperify/$NAME"
REPO_NAME="$ORG/io.hyperify.$NAME"
REPO_URL="https://github.com/$REPO_NAME.git"

if test -d "$DIR"; then
  :
else
  git submodule add "$REPO_URL" "$DIR"
fi
git config -f .gitmodules "submodule.$DIR.branch" "$BRANCH"
