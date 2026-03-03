#!/bin/bash
# 02_move_assets.sh — Move styles.css and main.js into subfolders
set -e

cp styles.css css/styles.css
cp main.js js/main.js

echo "✓ Copied styles.css → css/styles.css"
echo "✓ Copied main.js   → js/main.js"
echo ""
echo "  Once you've verified index.html loads correctly, you can delete"
echo "  the originals: rm styles.css main.js"
