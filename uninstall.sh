
#curl -sSL https://raw.githubusercontent.com/Nauman3S/IOTManagementSystem/main/uninstall.sh | bash

Black='\033[0;30m'  # Black
Red='\033[0;31m'    # Red
Green='\033[0;32m'  # Green
Yellow='\033[0;33m' # Yellow
Blue='\033[0;34m'   # Blue
Purple='\033[0;35m' # Purple
Cyan='\033[0;36m'   # Cyan
White='\033[0;37m'  # White
NC='\033[0m'        # No Color

echo "IOT Management System Client Uninstaller"

######## VARIABLES #########
MAC=$(ip link show eth0 | grep link/ether | awk '{print $2}' | sed 's/://g')
uninstall() {
    printf "${Red} Uninstalling IoTManagementSystem RPiClient.${NC}"
    printf "Uninstalling RPiClient from  ${Purple} ${MAC} ${NC}"
    printf "\n\n"
    echo "Stopping RPiClient"
    sudo service RPiClient-rs stop;
    echo "Stopping RPiClient-user-script"
    sudo service RPiClient-rs-user-script stop;
    echo "Removing RPiClient Directory"
    sudo rm -rf $HOME/RPiClient-rs;
    echo "Remvoving RPiClient from systemd"
    sudo rm -rf /lib/systemd/system/RPiClient-rs.service;
    echo "Remvoving RPiClient-user-script from systemd"
    sudo rm -rf /lib/systemd/system/RPiClient-rs-user-script.service;
    echo "Reloading systemctl deamon"
    sudo systemctl daemon-reload;
    echo "Removing IoTManagementSystem files."
    sudo rm -rf $HOME/IoTManagementSystem
}

echo "Welcome user" $USER
show_ascii() {
    toilet IoT Management System -t --metal
}
show_ascii
uninstall

MAC=$(ip link show eth0 | grep link/ether | awk '{print $2}' | sed 's/://g')

printf "${Green} Uninstall Completed. IOTManagementSystem RPiClient deleted from this device with MAC Address ${MAC^^}. Please restart your Raspberry Pi${NC}\n"
