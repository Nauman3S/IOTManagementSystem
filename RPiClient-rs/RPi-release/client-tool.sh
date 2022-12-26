#!/bin/bash
readonly TARGET_HOST=pi@PCITEST002.local
readonly TARGET_PATH=/home/pi/RPiClient-rs/
readonly TARGET_ARCH=aarch64-unknown-linux-gnu
readonly PASS="PER\$P3CTIV3TEST"
#PER$P3CTIV3TEST
RED='\033[0;31m'
NC='\033[0m' # No Color


Help()
{
   # Display Help
   echo "Add description of the script functions here."
   echo
   echo "Syntax: Arguments [-r|b|p|e|g|h|u]"
   echo "options:"
   echo "r  Cross-compile and release for Raspberry Pi and copy the release file to RPi-release folder."
   echo "b Cross-compile and release for Raspberry Pi and push the files to the Raspberry Pi and copy the release file to RPi-release folder."
   echo "p     Compile and release for the current system and copy the release file to release folder."
   echo "e     Compile and run on this system."
   echo "s     SSH into Raspberry Pi."
   echo "u     Uninstall everything from remote."
   echo "h     Print this Help."
   echo
}
BuildForRPi(){
    cross build --target=${TARGET_ARCH} --release
    mkdir -p RPi-release
    rm -rf ./RPi-release/RPiClient-rs.tar
    cp ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs ./RPi-release/
    cp ./*sh ./RPi-release/
    cp -r ./data ./RPi-release
    cp ./*service ./RPi-release
    mkdir ./RPi-release/logs
    cd RPi-release
    tar -cvf RPiClient-rs.tar . && cd ..
    


}
BuildForRPiandPush(){
    
    cross build --target=${TARGET_ARCH} --release
    mkdir RPi-release
    cp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs RPi-release
    echo "Stopping RPiClient-rs service"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo service RPiClient-rs stop'
    echo "Creating RPiClient-rs directory in ${TARGET_HOST}"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'mkdir $HOME/RPiClient-rs'
    echo "Copying RPiClient-rs files"
    sshpass -p ${PASS} scp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs logs ./upgradeOS.sh ./update-services.sh ./ota.sh ./user-script.sh ./RPiClient-rs.service ./RPiClient-rs-user-script.service ${TARGET_HOST}:${TARGET_PATH}
    echo "Starting RPiClient-rs service"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo service RPiClient-rs start'

}
SSHRPi(){
    echo "SSH" ${TARGET_HOST} "With Pass: " ${PASS}
    sshpass -p ${PASS} ssh -t ${TARGET_HOST}
}
BuildNormal(){
    cargo build --release
    mkdir release
    cp -r ./target/release/RPiClient-rs release
}
Run(){
    cargo run
}

UninstallRemote(){
    printf "${RED}Uninstalling RPiClient from ${NC}  ${TARGET_HOST}"
    printf "\n\n"
    echo "Stopping RPiClient"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo service RPiClient-rs stop'
    echo "Stopping RPiClient-user-script"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo service RPiClient-rs-user-script stop'
    echo "Removing RPiClient Directory"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'stty raw -echo;sudo rm -rf $HOME/RPiClient-rs'
    echo "Remvoving RPiClient from systemd"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo rm -rf /lib/systemd/system/RPiClient-rs.service'
    echo "Remvoving RPiClient-user-script from systemd"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo rm -rf /lib/systemd/system/RPiClient-rs-user-script.service'
    echo "Reloading systemctl deamon"
    sshpass -p ${PASS} ssh -t ${TARGET_HOST} 'sudo systemctl daemon-reload'
}
# Transform long options to short ones
for arg in "$@"; do
  shift
  case "$arg" in
    '--help')   set -- "$@" '-h'   ;;
    '--x-compile') set -- "$@" '-r'   ;;
    '--x-compile-push')   set -- "$@" '-b'   ;;
    '--compile')     set -- "$@" '-p'   ;;
    '--compile-run')     set -- "$@" '-e'   ;;
    '--ssh')     set -- "$@" '-s'   ;;
    '--uninstall-remote')     set -- "$@" '-u'   ;;
    *)          set -- "$@" "$arg" ;;
  esac
done

# Default behavior
number=0; rest=false; ws=false

# Parse short options
OPTIND=1
while getopts ":hnrbpesu" opt
do
  case "$opt" in
    'h') Help; exit 0 ;;
    'r') BuildForRPi ;;
    'b') BuildForRPiandPush ;;
    'p') BuildNormal ;;
    'e') Run ;;
    's') SSHRPi ;;
    'u') UninstallRemote ;;
    '?') Help >&2; exit 1 ;;
  esac
done
shift $(expr $OPTIND - 1) # remove options from positional parameters