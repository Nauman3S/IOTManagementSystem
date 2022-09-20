#!/bin/bash

until [ -f /home/pi/RPiClient-rs/RPiClient-rs.tar ]
do
     sleep 5
done
echo "File found"
tar -xvf /home/pi/RPiClient-rs/RPiClient-rs.tar
rm -rf /home/pi/RPiClient-rs/RPiClient-rs.tar
sudo service RPiClient-rs restart
exit