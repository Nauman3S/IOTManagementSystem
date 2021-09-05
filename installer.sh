#-e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e

echo "IOT Management System Client Installer"

######## VARIABLES #########

# Location for final installation log storage
installLogLoc=/etc/pihole/install.log


echo `Welcome user $USER`

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