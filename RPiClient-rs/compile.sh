#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail
set -o xtrace
# readonly TARGET_HOST=pi@raspberrypi.local
readonly TARGET_HOST=pi@192.168.178.77
readonly TARGET_PATH=/home/pi/RPiClient-rs/
readonly TARGET_ARCH=aarch64-unknown-linux-gnu
readonly PASS="PER\$P3CTIV3TEST"


Help()
{
   # Display Help
   echo "Add description of the script functions here."
   echo
   echo "Syntax: scriptTemplate [-g|h|v|V]"
   echo "options:"
   echo "r  Cross-compile and release for Raspberry Pi and copy the release file to RPi-release folder."
   echo "b Cross-compile and release for Raspberry Pi and push the files to the Raspberry Pi and copy the release file to RPi-release folder."
   echo "p     Compile and release for the current system and copy the release file to release folder."
   echo "e     Compile and run on this system."
   echo "g     Print the GPL license notification."
   echo "h     Print this Help."
   echo "v     Verbose mode."
   echo "V     Print software version and exit."
   echo
}

BuildForRPi(){
    TARGET_PATH=/home/pi/RPiClient-rs/
    TARGET_ARCH=aarch64-unknown-linux-gnu
    cross build --target=${TARGET_ARCH} --release
    mkdir RPi-release
    cp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs RPi-release
}
BuildForRPiandPush(){
    readonly TARGET_PATH=/home/pi/RPiClient-rs/
    readonly TARGET_ARCH=aarch64-unknown-linux-gnu
    cross build --target=${TARGET_ARCH} --release
    mkdir RPi-release
    cp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs RPi-release
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} sudo service RPiClient-rs stop
    sshpass -p ${PASS} scp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs logs ./upgradeOS.sh ./update-services.sh ./ota.sh ./user-script.sh ./RPiClient-rs.service ./RPiClient-rs-user-script.service ${TARGET_HOST}:${TARGET_PATH}
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} sudo service RPiClient-rs start

}
BuildNormal(){
    cargo build --release
    mkdir release
    cp -r ./target/release/RPiClient-rs release
}
Run(){
    cargo run
}
# Set variables
Name="world"

############################################################
# Process the input options. Add options as needed.        #
############################################################
# Get the options
while getopts ":hrbpen:" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      r)
        BuildForRPi
        exit;;
      b)
        BuildNormal
        exit;;
      p)
        BuildForRPiandPush
        exit;;
      e)
        Run
        exit;;
      n) # Enter a name
         Name=$OPTARG;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done


echo "hello $Name!"


# sshpass -p "PER\$P3CTIV3TEST" ssh pi@192.168.178.79