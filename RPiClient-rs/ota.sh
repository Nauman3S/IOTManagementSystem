#!/bin/bash

until [ -f /home/pi/RPiClient-rs/RPiClient-rs.tar ]
do
     sleep 5
done
echo "File found"
sudo tar -xvf /home/pi/RPiClient-rs/RPiClient-rs.tar
sudo rm -rf /home/pi/RPiClient-rs/RPiClient-rs.tar
sudo service RPiClient-rs restart
sudo echo "Last OTA Performed at: \n `date`">/home/pi/RPiClient-rs/logs/ota.log
exit