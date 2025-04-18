
# Change Log
All notable changes to this project will be documented in this file.

## Related Links
The new client can be downloaded from here: https://github.com/Nauman3S/IOTManagementSystem

## Updates Summary - 2022-12-17

-   Added `client-tool.sh` for multiple operations.

## Updates Summary - 2022-12-14

- Installed and configured CapRover on the Server.(Ref: Milestone 1)
-   -   [https://captain.prod.dev-pci.com/](https://captain.prod.dev-pci.com/)
-   Configured MQTT Broker on the new server
-   -   [50.19.43.139:1883](50.19.43.139:1883)
-   -   Username/Password: device/device
-   Installed and Configured NetDataMonitor for comprehensive server monitoring.
-   -   [https://captain.prod.dev-pci.com/net-data-monitor/](https://captain.prod.dev-pci.com/net-data-monitor/)
- Added a new backend and frontend for devices management.(Ref: Milestone 3)
- Added `compile` script for compiling, releasing and pushing the Client.


## Updates Summary - 2022-09-20

Pre-configured .img file: https://drive.google.com/drive/folders/1JjKgjd-HqMF4WDyalsfsEwI3Kb5WTj4X?usp=sharing

*Demo video of the implemented changes: https://youtu.be/ThBfGEvoArY*

*Demo video of fail-saftey features: https://youtu.be/HbAFMixfPCg*


The updates to the backend are also applied to your server and are ready to be tested.

- Remote shell commands execution
- Files upload via S3 or any other valid URL.
- Files upload directly using API end-point.
-RPiClient now has the ability to update itself via API endpoint.
- Configurable user-script that runs on the Raspberry Pi boot and can be modified using API end-point.
- More verbose logging. All the logs related to the RPiClient and your programs(python or any other program running via user-script functionality) are stored in the logs directory of RPiClient-rs and can be retrieved over MQTT.
- RPiClient-rs and user-script now run automatically on the Raspberry Pi startup with multiple failure safety checks and in case of unexpected crashes, the RPiClient-rs and user-script restart themselves.
- A number of optimizations.

### Test Instructions

A quick overview of how you can test your desired functionality:
1) Update `FW.py` and `FW_Utils.py` independently
With the `/update` and `/update-url` API endpoints you can push the FW.py and `FW_Utils.py` files to all or specific devices running the RPiClient-rs.

2) Update `FW_ML_Model.pt` from the s3 download
With `/update-url` API endpoint, you can push the `FW_ML_Model.pt` to the device or all the devices in the system. You will need to use s3 or any other CDN valid URL in the API call parameters.

3) Activate a Conda environment at launch

This can be achieved in two different ways:

*   With `/config` API endpoint you can invoke shell commands one after the other.

*   With `/update-script` API endpoint, you can upload your custom bash script to a specific device or all devices in the system. Your custom script can have any anything in it and the RPiClient-rs will make sure to run it on every boot or restart it in case of a crash.

4) Run `FW.py`  at launch (after conda env is active)
Again this can be done in two different ways similar to the one mentioned in the above point #3. But the recommended method would be to use `/update-script` API endpoint and push a script to the device. The script will contain a list of commands to activate conda environment and at the end, it can contain python3 `FW.py` to run the python program. Please note that user-script uploaded by `/update-script` API endpoint is managed by RPiClient-rs and it runs at the launch and restarts itself if something crashes. Moreover, all of the logs(even the ones generated by your `FW.py`) will be present in the logs directory and can be accessed via MQTT.

## Updates Summary - 2022-09-01

-   The RPiClient is now re-written in Rust. The new firmware is now very stable and failsafe.
-   The new RPiClient is now working truly asynchronously. Multiple commands can be sent to the client and it works without crashing.
-   The new RPiClient allows downloading big files from sources like AWS S3 and with the asynchronous download process.
-   The new RPiClient now takes much less memory than the older python-based firmware.