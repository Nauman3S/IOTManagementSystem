#!/bin/sh
apt update && sudo upgrade -y
if [ $? -eq 0 ]; then
   echo OK>$HOME/RPiClient/logs/upgradeOP.txt
else
   echo FAIL>$HOME/RPiClient/logs/upgradeOP.txt
fi
