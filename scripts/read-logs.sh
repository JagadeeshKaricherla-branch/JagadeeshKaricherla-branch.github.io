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

# Get and print all release tags
tags=$(git tag --list)

echo "Release Tags:"
echo "${tags}"

# Last release tag
LAST_RELEASE_TAG="v1.0" # Replace with your last release tag

# Fetch the latest changes from the remote repository
git fetch --tags

# Get the commit hashes since the last release tag
COMMITS=$(git log ${LAST_RELEASE_TAG}..HEAD --pretty=format:"%H")

# Iterate over each commit hash
for commit in $COMMITS; do
    echo "Commit: $commit"
    
    # Get commit details
    git show --quiet --format="%B" $commit
    
    echo "-------------------------"
done
# Write the value to the environment variable
echo "MY_VARIABLE=$COMMITS" >> $GITHUB_ENV

echo -en "${GREEN}Done ...${NC}\n"
