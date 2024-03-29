#-e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
#curl -sSL https://raw.githubusercontent.com/Nauman3S/IOTManagementSystem/main/installer.sh | bash
set -e
# Regular Colors
Black='\033[0;30m'  # Black
Red='\033[0;31m'    # Red
Green='\033[0;32m'  # Green
Yellow='\033[0;33m' # Yellow
Blue='\033[0;34m'   # Blue
Purple='\033[0;35m' # Purple
Cyan='\033[0;36m'   # Cyan
White='\033[0;37m'  # White
NC='\033[0m'        # No Color

echo "IOT Management System Client Installer"

######## VARIABLES #########
MAC=$(ip link show eth0 | grep link/ether | awk '{print $2}' | sed 's/://g')
# Location for final installation log storage
#installLogLoc=/etc/pihole/install.log
err_handler() {
    printf "${Red} Error Occurred. Removing applied changes.${NC}"
    printf "${RED}Uninstalling RPiClient from ${NC} ${MAC}"
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
    sudo rm -rf $HOME/IoTManagementSystem
}
trap 'err_handler' ERR

echo "Welcome user" $USER
sudo apt clean
sudo apt install -qq toilet -y >/dev/null 2>&1
show_ascii() {
    toilet IoT Management System -t --metal
}
show_ascii

printf "${Green} Installing RPiClient-rs ${NC}\n"
if [ -d "$HOME/RPiClient-rs" ]; then
    printf "${White} Directory RPiClient-rs already exists. ${NC}\n"
else

    printf "${Red} Error: Directory RPiClient does not exists. Creating one. ${NC}\n"
    printf "${Purple} Cloning IoTManagementSystem Repository ${NC}\n"
    cd $HOME
    # mkdir ~/RPiClient
    git clone \
        --depth 1 \
        --filter=blob:none \
        --sparse \
        https://github.com/Nauman3S/IOTManagementSystem
    cd IOTManagementSystem
    git sparse-checkout set RPiClient-rs
    mv RPiClient-rs ../
    cd ..
    rm -rf IOTManagementSystem
    cd RPiClient-rs
    mv RPi-release/RPiClient-rs .
    rm -rf RPi-release
    rm -rf release
    rm -rf .cargo Cargo*
    rm -rf Dockerfile
    rm -rf src
    printf "${Green} Installing systemd deamon for RPiClient-rs and RPiClient-rs-user-script ${NC}\n"
    sudo cp RPiClient-rs.service /lib/systemd/system/
    sudo cp RPiClient-rs-user-script.service /lib/systemd/system/
    sudo chmod a+rx RPiClient-rs
    sudo chmod a+rx updateFW.sh
    sudo chmod a+rx user-script.sh
    sudo chmod a+rx update-services.sh
    sudo chmod a+rx upgradeOS.sh
    sudo chmod a+rx ota.sh
    # sudo systemctl daemon-reload
    sudo systemctl enable RPiClient-rs
    sudo systemctl enable RPiClient-rs-user-script
    sudo service RPiClient-rs start
    sudo service RPiClient-rs-user-script start
fi
if [ -d "$HOME/RPiClient-rs/logs" ]; then

    printf "${White} Directory RPiClient-rs/logs already exists. ${NC}\n"
else
    printf "${Red} Error: Directory RPiClient-rs/logs does not exists. Creating one. ${NC}\n"
    mkdir ${HOME}/RPiClient-rs/logs
fi

MAC=$(ip link show eth0 | grep link/ether | awk '{print $2}' | sed 's/://g')

printf "${Green} Installtion Completed. Add a new device to IOTMSys with Mac Address ${MAC^^} and restart your Raspberry Pi${NC}\n"
