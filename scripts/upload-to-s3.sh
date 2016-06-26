#! /bin/bash

set -xe

mkdir -p release
tar -C release -vxzf dist/kappenball.tar.gz
cd release
aws s3 sync . s3://kappenball --exclude ".git/*" --exclude ".DS_Store" --exclude "ci.sh"
