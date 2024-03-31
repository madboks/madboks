#!/bin/bash

create_if_not_exists() {
    local file_path="$1"

    # Check if the file exists
    if [ ! -f "$file_path" ]; then
        # File doesn't exist, create it
        touch "$file_path"
        echo "File created: $file_path"
    fi
}

# Function to copy from old_filename (if exists) to new_filename (if doesn't exist)
copy_and_rename_file_if_exists() {
    local old_filename="$1"
    local new_filename="$2"
    if [ -f "$old_filename" ]; then
        if [ ! -f "$new_filename" ]; then
            cp -v "$old_filename" "$new_filename"
        fi
    fi
}

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color