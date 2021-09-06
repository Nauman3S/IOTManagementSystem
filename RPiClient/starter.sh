#!/bin/bash
sleep 8
#screen -d -m -S ftpcamera python3 main.py
while ! ping -c 1 -W 1 8.8.8.8; do
    echo "Waiting for 8.8.8.8 - network interface might be down..."
    sleep 1
done

(/usr/bin/python3 /home/pi/RPiClient/main.py >/home/pi/RPiClient/logs/main_logs.txt 2>&1)
sleep 3
(/usr/bin/python3 /home/pi/RPiClient/fw.py >/home/pi/RPiClient/logs/fw_logs.txt 2>&1)