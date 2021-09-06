#!/bin/sh
sudo apt update && sudo upgrade -y
if [ $? -eq 0 ]; then
   echo OK>upgradeOP.txt
else
   echo FAIL>upgradeOP.txt
fi
