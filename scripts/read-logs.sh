#/bin/bash

#
# Script to read all commits since last release

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

#--------------------------------------------------------------------------------------------
# Read
#--------------------------------------------------------------------------------------------

# Set the value you want to assign to the environment variable
my_variable="Hello, GitHub Actions!"

# Write the value to the environment variable
echo "MY_VARIABLE=$my_variable" >> $GITHUB_ENV

echo -en "${GREEN}Done ...${NC}\n"
