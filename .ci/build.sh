#!/bin/bash

set -e

echo 'Apagando dist'
rm -rf dist/

echo ' '
echo 'npm run build'
npm run build
