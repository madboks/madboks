#!/bin/bash

source scripts/lib.sh

set -euo pipefail

# Display help function
display_help() {
    echo -e "${GREEN}Usage:${NC} $0 <app_name> <script_name>"
    echo -e "${GREEN}Description:${NC} This script executes a yarn script for the specified app."
    echo -e "${GREEN}Options:${NC}"
    echo -e "  ${GREEN}-h, --help${NC}           Display this help message"
    echo -e "  ${GREEN}<app_name>${NC}           Name of the app"
    echo -e "  ${GREEN}<script_name>${NC}        Name of the script to execute"
}

# Check if only one argument is provided and it is -h or --help
if [ "$#" -eq 1 ] && { [ "$1" == "-h" ] || [ "$1" == "--help" ]; }; then
    display_help
    exit 0
fi

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <app_name> <script_name>"
    exit 1
fi

# Assign arguments to variables
app_name=$1
script_name=$2

# File .env are part of .gitignore. They belong to each workspace
copy_and_rename_file_if_exists apps/$app_name/.env.sample apps/$app_name/.env

# Execute yarn script with the provided app name
yarn workspace @madboks/"$app_name" run "$script_name"