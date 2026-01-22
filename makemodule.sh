#!/usr/bin/env bash

rm -rf ./module/*
npx tsc --declaration -p ./
mkdir -p module/app
mv -v app/*.js app/*.d.ts module/app/
cp package.json module/package.json
cp -r src/ test module/
cp rescript.json module/rescript.json
