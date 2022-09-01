#!/bin/bash

sshpass -p "raspberry" scp -r * pi@raspberrypi.local:/home/pi/RPiClient-rs/
