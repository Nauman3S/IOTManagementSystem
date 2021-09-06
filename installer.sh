#-e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e

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

sudo pip3 install setuptools;
sudo pip3 install vcgencmd;
sudo pip3 install paho-mqtt;
sudo apt install neofetch;
if [ -d "$HOME/RPiClient" ]
then
    echo "Directory RPiClient exists."
else
    echo "Error: Directory RPiClient does not exists."
    cd $HOME
    # mkdir ~/RPiClient
    git clone \
    --depth 1  \
    --filter=blob:none  \
    --sparse \
    https://github.com/Nauman3S/IOTManagementSystem;
    cd IOTManagementSystem
    git sparse-checkout set RPiClient
    mv RPiClient ../
    cd ..
    rm -rf IOTManagementSystem
    
fi
if [ -d "$HOME/RPiClient/logs" ]
then
    echo "Directory RPiClient/logs exists."
else
    echo "Error: Directory RPiClient does not exists."
    mkdir ~/RPiClient/logs
fi

File="/etc/rc.local"

if [[ $(grep "(sleep 10; sh /home/pi/RPiClient/starter.sh)&" $File) ]] ; then
    echo "Found startup script. Doing nothing."
else
    echo "Not Found. Adding startup script"
    sed -i -e '$i \(sleep 10; sh /home/pi/RPiClient/starter.sh)&\n' /etc/rc.local
fi

MAC=`ip link show wlan0 | grep link/ether | awk '{print $2}' | sed 's/://g'`


echo "Installtion Completed. Add a new device to IOTMSys with Mac Address $MAC and restart your Raspberry Pi"