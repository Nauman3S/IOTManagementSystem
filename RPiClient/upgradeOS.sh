#!/bin/sh
sudo apt update && sudo upgrade -y
if [ $? -eq 0 ]; then
   echo OK>/home/pi/RPiClient/logs/upgradeOP.txt
else
   echo FAIL>/home/pi/RPiClient/logs/upgradeOP.txt
fi
