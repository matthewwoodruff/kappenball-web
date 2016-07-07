#! /bin/bash

set -xe

mkdir -p dist

tar -vczf dist/kappenball.tar.gz \
    --exclude=".git*" \
    --exclude="*.sh" \
    --exclude=".DS_Store" \
    --exclude="dist" \
    .
if ! [[ -z $SNAP_PIPELINE_COUNTER ]]; then
git tag build-$SNAP_PIPELINE_COUNTER 
git push origin --tags
fi
