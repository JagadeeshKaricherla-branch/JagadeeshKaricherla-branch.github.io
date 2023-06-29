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


# fetch tags, to be sure we have all the require info
git fetch --tags

# collect the commits since the last tag
export GIT_RELEASE_NOTES="$(git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h %s")"

# Write the value to the environment variable
echo "MY_VARIABLE=$GIT_RELEASE_NOTES" >> $GITHUB_ENV

echo -en "${GREEN}Done ...${NC}\n"
