# Install script for directory: /home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Debug")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/libpaho-mqtt3c.a")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/libpaho-mqtt3a.a")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include" TYPE FILE FILES
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTAsync.h"
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTClient.h"
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTClientPersistence.h"
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTProperties.h"
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTReasonCodes.h"
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTSubscribeOpts.h"
    "/home/ubuntu/.cargo/registry/src/github.com-1ecc6299db9ec823/paho-mqtt-sys-0.7.0/paho.mqtt.c/src/MQTTExportDeclarations.h"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/libpaho-mqtt3cs.a")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/libpaho-mqtt3as.a")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig.cmake")
    file(DIFFERENT EXPORT_FILE_CHANGED FILES
         "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig.cmake"
         "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/CMakeFiles/Export/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig.cmake")
    if(EXPORT_FILE_CHANGED)
      file(GLOB OLD_CONFIG_FILES "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig-*.cmake")
      if(OLD_CONFIG_FILES)
        message(STATUS "Old export file \"$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig.cmake\" will be replaced.  Removing files [${OLD_CONFIG_FILES}].")
        file(REMOVE ${OLD_CONFIG_FILES})
      endif()
    endif()
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c" TYPE FILE FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/CMakeFiles/Export/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig.cmake")
  if("${CMAKE_INSTALL_CONFIG_NAME}" MATCHES "^([Dd][Ee][Bb][Uu][Gg])$")
    file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c" TYPE FILE FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/CMakeFiles/Export/lib/cmake/eclipse-paho-mqtt-c/eclipse-paho-mqtt-cConfig-debug.cmake")
  endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake/eclipse-paho-mqtt-c" TYPE FILE FILES "/mnt/c/Users/nauma/Documents/data/W2/Windows/Per/IOTP56_cont_IOTP55/IOTMSys/RPiClient-rs/target/debug/build/paho-mqtt-sys-2cdf4964d91261b2/out/build/src/eclipse-paho-mqtt-cConfigVersion.cmake")
endif()

