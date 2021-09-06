#!/bin/bash
sleep 8
#screen -d -m -S ftpcamera python3 main.py
(/usr/bin/python3 /home/pi/RPiClient/main.py >/home/pi/RPiClient/logs/main_logs.txt 2>&1)
sleep 3
(/usr/bin/python3 /home/pi/RPiClient/fw.py >/home/pi/RPiClient/logs/fw_logs.txt 2>&1)