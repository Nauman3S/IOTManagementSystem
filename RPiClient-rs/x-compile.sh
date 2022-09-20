#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace
# readonly TARGET_HOST=pi@raspberrypi.local
readonly TARGET_HOST=pi@192.168.178.77
readonly TARGET_PATH=/home/pi/RPiClient-rs/
readonly TARGET_ARCH=aarch64-unknown-linux-gnu
readonly PASS="PER\$P3CTIV3TEST"

cross build --target=${TARGET_ARCH} --release
sshpass -p ${PASS} ssh -t ${TARGET_HOST} sudo service RPiClient-rs stop
sshpass -p ${PASS} scp -r ./target/aarch64-unknown-linux-gnu/release/RPiClient-rs logs ./upgradeOS.sh ./update-services.sh ./ota.sh ./user-script.sh ./RPiClient-rs.service ./RPiClient-rs-user-script.service ${TARGET_HOST}:${TARGET_PATH}
sshpass -p ${PASS} ssh -t ${TARGET_HOST} sudo service RPiClient-rs start