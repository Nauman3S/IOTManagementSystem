#-e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e
# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White
NC='\033[0m' # No Color

echo "IOT Management System Client Installer"

######## VARIABLES #########

# Location for final installation log storage
#installLogLoc=/etc/pihole/install.log


echo "Welcome user"
echo $USER

show_ascii_berry() {
    echo -e "

_________________________   _______    _______         _______
\__   __(  ___  \__   __/  (       )  (  ____ |\     /(  ____ \
   ) (  | (   ) |  ) (     | () () |  | (    \( \   / | (    \/
   | |  | |   | |  | |     | || || |  | (_____ \ (_) /| (_____
   | |  | |   | |  | |     | |(_)| |  (_____  ) \   / (_____  )
   | |  | |   | |  | |     | |   | |        ) |  ) (        ) |
___) (__| (___) |  | |     | )   ( |  /\____) |  | |  /\____) |
\_______(_______)  )_(     |/     \|  \_______)  \_/  \_______)


    "
}
show_ascii_berry

sudo apt install neofetch -y --force-yes;
printf "${Green} Installing RPiClient-rs ${NC}\n"
if [ -d "$HOME/RPiClient" ]
then
    printf "${White} Directory RPiClient-rs already exists. ${NC}\n"
else
    
    printf "${Red} Error: Directory RPiClient does not exists. Creating one. ${NC}\n"
    printf "${Purple} Cloning IoTManagementSystem Repository ${NC}\n"
    cd $HOME
    # mkdir ~/RPiClient
    git clone \
    --depth 1  \
    --filter=blob:none  \
    --sparse \
    https://github.com/Nauman3S/IOTManagementSystem;
    cd IOTManagementSystem
    git sparse-checkout set RPiClient-rs
    mv RPiClient-rs ../
    cd ..
    rm -rf IOTManagementSystem
    cd RPiClient-rs
    printf "${Green} Installing systemd deamon for RPiClient-rs and RPiClient-rs-user-script ${NC}\n"
    sudo cp RPiClient-rs.service /lib/systemd/system/
    sudo cp RPiClient-rs-user-script.service /lib/systemd/system/
    systemctl daemon-reload
    sudo systemctl enable RPiClient-rs
    sudo systemctl enable RPiClient-rs-user-script
    sudo service RPiClient-rs start; sudo service RPiClient-rs-user-script start
fi
if [ -d "$HOME/RPiClient/logs" ]
then
    
    printf "${White} Directory RPiClient-rs/logs already exists. ${NC}\n"
else
    printf "${Red} Error: Directory RPiClient/logs does not exists. Creating one. ${NC}\n"
    mkdir ~/RPiClient/logs
fi


MAC=`ip link show wlan0 | grep link/ether | awk '{print $2}' | sed 's/://g'`

printf "${Green} Installtion Completed. Add a new device to IOTMSys with Mac Address $MAC and restart your Raspberry Pi${NC}\n"