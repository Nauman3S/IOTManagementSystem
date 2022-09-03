#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace

# readonly TARGET_HOST=pi@raspberrypi
# readonly TARGET_PATH=/home/pi/hello-world
readonly TARGET_ARCH=armv7-unknown-linux-gnueabihf
# readonly SOURCE_PATH=./target/${TARGET_ARCH}/release/hello-world

cargo build --release --target=${TARGET_ARCH}
# rsync ${SOURCE_PATH} ${TARGET_HOST}:${TARGET_PATH}
# ssh -t ${TARGET_HOST} ${TARGET_PATH}

sshpass -p "raspberry" scp -r ./target/armv7-unknown-linux-gnueabihf/release/RPiClient-rs pi@raspberrypi.local:/home/pi/RPiClient-rs/
