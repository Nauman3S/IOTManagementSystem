# This file will be configured to contain variables for CPack. These variables
# should be set in the CMake list file of the project before CPack module is
# included. The list of available CPACK_xxx variables and their associated
# documentation may be obtained using
#  cpack --help-variable-list
#
# Some variables are common to all generators (e.g. CPACK_PACKAGE_NAME)
# and some are specific to a generator
# (e.g. CPACK_NSIS_EXTRA_INSTALL_COMMANDS). The generator specific variables
# usually begin with CPACK_<GENNAME>_xxxx.


set(CPACK_BUILD_SOURCE_DIRS "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c;/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build")
set(CPACK_CMAKE_GENERATOR "Unix Makefiles")
set(CPACK_COMPONENT_UNSPECIFIED_HIDDEN "TRUE")
set(CPACK_COMPONENT_UNSPECIFIED_REQUIRED "TRUE")
set(CPACK_DEFAULT_PACKAGE_DESCRIPTION_FILE "/usr/share/cmake-3.22/Templates/CPack.GenericDescription.txt")
set(CPACK_DEFAULT_PACKAGE_DESCRIPTION_SUMMARY "Eclipse Paho C built using CMake")
set(CPACK_GENERATOR "TGZ")
set(CPACK_INSTALL_CMAKE_PROJECTS "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build;Eclipse Paho C;ALL;/")
set(CPACK_INSTALL_PREFIX "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out")
set(CPACK_MODULE_PATH "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/cmake/modules")
set(CPACK_NSIS_DISPLAY_NAME "Eclipse-Paho-MQTT-C 1.3.10")
set(CPACK_NSIS_INSTALLER_ICON_CODE "")
set(CPACK_NSIS_INSTALLER_MUI_ICON_CODE "")
set(CPACK_NSIS_INSTALL_ROOT "$PROGRAMFILES")
set(CPACK_NSIS_PACKAGE_NAME "Eclipse-Paho-MQTT-C 1.3.10")
set(CPACK_NSIS_UNINSTALL_NAME "Uninstall")
set(CPACK_OUTPUT_CONFIG_FILE "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/CPackConfig.cmake")
set(CPACK_PACKAGE_DEFAULT_LOCATION "/")
set(CPACK_PACKAGE_DESCRIPTION_FILE "/usr/share/cmake-3.22/Templates/CPack.GenericDescription.txt")
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "Eclipse Paho C built using CMake")
set(CPACK_PACKAGE_FILE_NAME "Eclipse-Paho-MQTT-C-1.3.10-Linux")
set(CPACK_PACKAGE_INSTALL_DIRECTORY "Eclipse-Paho-MQTT-C 1.3.10")
set(CPACK_PACKAGE_INSTALL_REGISTRY_KEY "Eclipse-Paho-MQTT-C 1.3.10")
set(CPACK_PACKAGE_NAME "Eclipse-Paho-MQTT-C")
set(CPACK_PACKAGE_RELOCATABLE "true")
set(CPACK_PACKAGE_VENDOR "Eclipse Paho")
set(CPACK_PACKAGE_VERSION "1.3.10")
set(CPACK_PACKAGE_VERSION_MAJOR "1")
set(CPACK_PACKAGE_VERSION_MINOR "3")
set(CPACK_PACKAGE_VERSION_PATCH "10")
set(CPACK_RESOURCE_FILE_LICENSE "/usr/share/cmake-3.22/Templates/CPack.GenericLicense.txt")
set(CPACK_RESOURCE_FILE_README "/usr/share/cmake-3.22/Templates/CPack.GenericDescription.txt")
set(CPACK_RESOURCE_FILE_WELCOME "/usr/share/cmake-3.22/Templates/CPack.GenericWelcome.txt")
set(CPACK_SET_DESTDIR "OFF")
set(CPACK_SOURCE_GENERATOR "TBZ2;TGZ;TXZ;TZ")
set(CPACK_SOURCE_OUTPUT_CONFIG_FILE "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/CPackSourceConfig.cmake")
set(CPACK_SOURCE_RPM "OFF")
set(CPACK_SOURCE_TBZ2 "ON")
set(CPACK_SOURCE_TGZ "ON")
set(CPACK_SOURCE_TXZ "ON")
set(CPACK_SOURCE_TZ "ON")
set(CPACK_SOURCE_ZIP "OFF")
set(CPACK_SYSTEM_NAME "Linux")
set(CPACK_THREADS "1")
set(CPACK_TOPLEVEL_TAG "Linux")
set(CPACK_WIX_SIZEOF_VOID_P "8")

if(NOT CPACK_PROPERTIES_FILE)
  set(CPACK_PROPERTIES_FILE "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/CPackProperties.cmake")
endif()

if(EXISTS ${CPACK_PROPERTIES_FILE})
  include(${CPACK_PROPERTIES_FILE})
endif()
