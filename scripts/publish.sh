#!/bin/bash
set -e
set -x
cd "$(dirname "$0")/.."

if test "x$BUILD_VERSION" = x; then
  echo 'BUILD_VERSION not defined' >&2
  exit 1
fi

CURRENT_BRANCH=$(git branch --show-current)

VERSION=$BUILD_VERSION

./scripts/pull-all.sh
./scripts/push-all.sh
git add */src
./scripts/build-production.sh
git commit -m "New release $VERSION"

git tag -a "test-v$VERSION" -m "Version $VERSION"
git push origin "test-v$VERSION"
git push

# Enable if we have a submodules related to the game
#(
#  cat .gitmodules|grep -F path|awk '{print $3}'|grep -F '/src/fi/sendanor/'|while read DIR; do
#    ( 
#      cd $DIR
#      git pull
#      if [ $(git tag -l "v$VERSION") ]; then
#        :
#      else
#        git tag -a "v$VERSION" -m "Version $VERSION" && git push origin "v$VERSION" && git push 
#      fi
#    )&
#  done
#)|cat

git checkout main
git merge "$CURRENT_BRANCH"
git push

git checkout v0.0
git merge main
git push

git checkout "$CURRENT_BRANCH"
