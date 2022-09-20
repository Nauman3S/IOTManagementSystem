#!/bin/bash

sudo service RPiClient-rs stop
sudo service RPiClient-rs-user-script stop

sudo cp RPiClient-rs.service /lib/systemd/system/
sudo cp RPiClient-rs-user-script.service /lib/systemd/system/

systemctl daemon-reload
sudo systemctl enable RPiClient-rs
sudo systemctl enable RPiClient-rs-user-script

sudo service RPiClient-rs start
sudo service RPiClient-rs-user-script start