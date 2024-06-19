#!/bin/bash

# Ensure TO is set
if [ -z "$TO" ]; then
  echo "Error: TO variable is not set."
  exit 1
fi

# Determine the package directory based on the current working directory
PACKAGE_DIR=$(pwd)
FROM="$PACKAGE_DIR/node_modules/@gouvfr/dsfr/dist"
TO="$PACKAGE_DIR/$TO"

# Determine the actual source directory
if [ ! -d "$FROM" ]; then
  FROM="$PACKAGE_DIR/../../node_modules/@gouvfr/dsfr/dist"
fi

# Create necessary directories
mkdir -p "$TO/utility"
mkdir -p "$TO/icons"
mkdir -p "$TO/artwork"
mkdir -p "$TO/fonts"

# Copy files
cp "$FROM/dsfr.module.min.js" "$TO/"
cp "$FROM/dsfr.module.min.js.map" "$TO/"
cp "$FROM/dsfr.nomodule.min.js" "$TO/"
cp "$FROM/dsfr.nomodule.min.js.map" "$TO/"
cp "$FROM/dsfr.min.css" "$TO/"
cp "$FROM/utility/utility.min.css" "$TO/utility/"
cp -R "$FROM/icons/." "$TO/icons/"
cp -R "$FROM/artwork/." "$TO/artwork/"
cp -R "$FROM/fonts/." "$TO/fonts/"
