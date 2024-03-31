#!/bin/bash

source scripts/lib.sh

set -euo pipefail

DEFAULT_DB_HOST="127.0.0.1"
DEFAULT_DB_PORT="4433"
DEFAULT_DB_USER="madboks"

# Display help function
display_help() {
    echo -e "${GREEN} Usage:${NC} $0 <db_host> <db_port> <db_user>"
    echo -e "${GREEN} Description:${NC} This script sets up environment variables and installs dependencies."
    echo -e "${GREEN} Options:${NC}"
    echo -e "  ${GREEN} -h, --help${NC}          Display this help message"
    echo -e "  ${GREEN} <db_host>${NC}           Database host (default: $DEFAULT_DB_HOST)"
    echo -e "  ${GREEN} <db_port>${NC}           Database port (default: $DEFAULT_DB_PORT)"
    echo -e "  ${GREEN} <db_user>${NC}           Database user (default: $DEFAULT_DB_USER)"
}

# Check if only one argument is provided and it is -h or --help
if [ "$#" -eq 1 ] && { [ "$1" == "-h" ] || [ "$1" == "--help" ]; }; then
    display_help
    exit 0
fi

# Set default values for environment variables if not given
export _DATABASE_HOST_=${1:-$DEFAULT_DB_HOST}
export _DATABASE_PORT_=${2:-$DEFAULT_DB_PORT}
export _DATABASE_USER_=${3:-$DEFAULT_DB_USER}

create_if_not_exists yarn.lock

yarn install
