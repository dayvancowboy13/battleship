#!/bin/bash
mkdir src dist
touch src/index.js src/template.html src/style.css
cp -r ~/Documents/template-files/* .
npm init -y
npm i -D webpack webpack-cli html-webpack-plugin webpack-dev-server webpack-merge eslint @stylistic/eslint-plugin-js style-loader css-loader
