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
branch="main"
Help()
{
   # Display Help
   echo "Add description of the script functions here."
   echo
   echo "Syntax: Arguments [-d|m|h]"
   echo "options:"
   echo "d  Dev branch."
   echo "m main branch."
   echo "h     Print this Help."
   echo
}
DevBranch(){
    printf "\n\n"
    printf "Using ${Yellow}dev ${NC}branch"
    printf "\n\n"
    branch="dev"
}
MainBranch(){
    printf "\n\n"
    printf "Using ${Green}main ${NC}branch"
    printf "\n\n"
    branch="main"
}
for arg in "$@"; do
  shift
  case "$arg" in
    '--help')   set -- "$@" '-h'   ;;
    '--dev') set -- "$@" '-d'   ;;
    '--main') set -- "$@" '-m'   ;;
    *)     set -- "$@" "$arg" ;;
  esac
done

# Default behavior
number=0; rest=false; ws=false

# Parse short options
OPTIND=1
while getopts "hdm" opt
do
  case "$opt" in
    'h') Help; exit 0 ;;
    'd') DevBranch ;;
    'm') MainBranch ;;
    '?') Help >&2; exit 1 ;;
  esac
done

shift $(expr $OPTIND - 1) # remove options from positional parameters

# echo "br: "$branch

tt(){
    if [ $branch = "dev" ]; then
        echo "br: "$branch
        DevBranch
    fi
}
tt