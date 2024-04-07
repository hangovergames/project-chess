#!/bin/bash
set -e
set -x
cd "$(dirname "$0")/.."

CURRENT_BRANCH=$(git branch --show-current)

VERSION=$(echo 0.1.$(( $(git tag|grep -E '^v0\.1\.'|sed -re 's/^v0\.1\.//'|sort -n|tail -n 1) + 1 )))

export BUILD_VERSION=$VERSION

./scripts/pull-all.sh
./scripts/push-all.sh
git add */src
./scripts/build-production.sh
git commit -m "New release $VERSION"

git tag -a "v$VERSION" -m "Version $VERSION"
git push origin "v$VERSION"
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

git checkout v0.1
git merge main
git push

git checkout "$CURRENT_BRANCH"
