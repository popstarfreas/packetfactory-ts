#!/usr/bin/env bash

rm -rf ./module/*
tsc --declaration -p ./
mv -v app/*.js app/*.d.ts module
cp package.json module/package.json
cp -r app/src/ app/test module/
cp rescript.json module/rescript.json
