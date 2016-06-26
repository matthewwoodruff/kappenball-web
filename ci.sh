#! /bin/bash

set -xe

aws s3 sync . s3://kappenball --exclude ".git/*" --exclude ".DS_Store"
