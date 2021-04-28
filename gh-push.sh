#!/bin/bash

# Arguments
while getopts m: flag
do
    case "${flag}" in
        m) message=${OPTARG};;
    esac
done

# Help
help()
{
    cat << HELP
Option  Description
  -m    커밋 메시지
HELP
exit 0
}
[ -z "$1" ] && help

# Body
if [ -n $message];
then
  echo "커밋 메시지를 입력해 주세요"
else
  git add .
  git commit -m "$message"
  git push
fi
