#! /bin/bash

set -xe

mkdir -p dist

tar -vczf dist/kappenball.tar.gz \
    --exclude=".git*" \
    --exclude="*.sh" \
    --exclude=".DS_Store" \
    --exclude="dist" \
    .
