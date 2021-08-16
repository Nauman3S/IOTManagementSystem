# IOT Management System

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Server Links](#srv)
- [Demo Videos](#videos)

## About <a name = "about"></a>

This repository contains Backend and Client App for Raspberry Pi

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on you raspberry pi.

### Prerequisites

Turn on your Raspberry Pi and execute the following commands

```
- sudo apt update
- sudo apt upgrade
- sudo pip3 install paho-mqtt
```

### Installing

Installing the Firmware to your Raspberry Pi
- Copy FimrwareIOTM to the Desktop of Raspberry Pi

Open the terminal and execute the following commands 

```
- cd ~/Desktop/FirmwareIOTM
- python3 main.py
```


## Usage <a name = "usage"></a>

- 

### Monitoring

- pm2 list
- pm2 monit

## List of Packages installed on server

- Mosquitto Broker
- NodeJS, NPM, Node, NVM
- PM2
- ufw
- mongod
- mongo-express
### Version Details

- Node v12.16.1
- NPM v6.13.4

## Server Links <a name = "srv"></a>

- MQTT Broker Link: 44.195.192.158:1883
- Backend Link: 44.195.192.158:3000

## MQTT Topic Details
### Topics List
#### Logs
1.  ```diff + iotm-sys/device/logs</mark>``` `(all log messages are published to this topic) READ-ONLY`

#### Fimrware

2.  iotm-sys/device/update/* `(global firmware update files are sent to this topic) WRITE-ONLY`
3.  iotm-sys/device/update/[macaddress] `(the fimrware file for specific device is sent to this topic {replace [macaddress] with the Mac address of the device without : in the address}) WRITE-ONLY`
4.  iotm-sys/device/firmware/all `(global firmware update files are received at this topic) READ-ONLY`
5.  iotm-sys/device/firmware/[macaddress] `(the fimrware file for specific device are received at this topic {replace [macaddress] with the Mac address of the device without : in the address}) READ-ONLY`
#### Device Management

6.  iotm-sys/device/add `(for adding a new device message format 'deviceName;macAddress;updatedAt') WRTIE-ONLY`

#### Device OS
7.  iotm-sys/device/upgrade/* `(global device OS upgrade) WRITE-ONLY`
8.  iotm-sys/device/upgrade/[macaddress] `(specific device OS upgrade, replace [macaddress] with device mac address without : chars ) WRITE-ONLY`
9.  iotm-sys/device/upgrade/all `(global OS upgrade instructions are received at this topic) READ-ONLY`
10. iotm-sys/device/upgrade/[macaddress] `(OS upgrade instructions for specific device are received at this topic {replace [macaddress] with the Mac address of the device without : in the address}) READ-ONLY`
11. iotm-sys/device/info/[macaddress] `(device and os info of specific device can be requested from this topic) WRITE-ONLY`
12. iotm-sys/device/info/response/[macaddress] `(device and os info request response is sent to this topic) READ-ONLY`




## Demo Videos <a name = "videos"></a>

- User Flow: 