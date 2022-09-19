#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace
readonly TARGET_HOST=pi@raspberrypi.local
readonly TARGET_PATH=/home/pi/RPiClient-rs/
readonly TARGET_ARCH=aarch64-unknown-linux-gnu

cross build --target=${TARGET_ARCH} --release
sshpass -p "raspberry" ssh -t ${TARGET_HOST} sudo service RPiClient-rs stop
sshpass -p "raspberry" scp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs logs ./upgradeOS.sh ./user-script.sh ./RPiClient-rs.service ./RPiClient-rs-user-script.service ${TARGET_HOST}:${TARGET_PATH}
sshpass -p "raspberry" ssh -t ${TARGET_HOST} sudo service RPiClient-rs start