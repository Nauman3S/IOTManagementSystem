#!/bin/sh
sudo apt update && sudo apt upgrade -y
HOME=/home/pi
if [ $? -eq 0 ]; then
   echo OK>$HOME/RPiClient-rs/logs/upgradeOP.txt
else
   echo FAIL>$HOME/RPiClient-rs/logs/upgradeOP.txt
fi
